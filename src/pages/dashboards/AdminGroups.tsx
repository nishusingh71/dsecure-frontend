import { Helmet } from 'react-helmet-async';
import { useState, useEffect } from 'react';
import { apiClient, type Group as APIGroup, type GroupUser, type CreateGroupPayload } from '@/utils/enhancedApiClient';
import { useAuth } from '@/auth/AuthContext';
import { useSubusers } from '@/hooks/useSubusers';
import { authService } from '@/utils/authService';
import { isDemoMode } from '@/data/demoData';

interface User {
    id: number;
    name: string;
    email: string;
    role: 'User' | 'Subuser' | 'Group Admin';
    department: string;
    license: number;
    profile: string;
    isGroupAdmin?: boolean;
}

interface Group {
    id: number;
    name: string;
    description: string;
    created: string;
    users: User[];
    licenseStats?: {
        totalAllocated: number;
        distributedToUsers: number;
        available: number;
        usagePercent: number;
    };
}

interface LicenseSummary {
    totalAllocated: number;
    totalDistributed: number;
    totalAvailable: number;
    overallUsagePercent: number;
}

export default function AdminGroups() {
    const { user } = useAuth();
    const isDemo = isDemoMode();
    
    // ✅ Get current user email from multiple sources (same as AdminReports)
    const getUserEmail = (): string => {
        const storedUser = localStorage.getItem("user_data");
        const authUser = localStorage.getItem("authUser");

        let storedUserData = null;
        if (storedUser) {
            try {
                storedUserData = JSON.parse(storedUser);
            } catch (e) {
                // console.error("Error parsing user_data:", e);
            }
        }

        if (!storedUserData && authUser) {
            try {
                storedUserData = JSON.parse(authUser);
            } catch (e) {
                // console.error("Error parsing authUser:", e);
            }
        }

        const jwtUser = authService.getUserFromToken();
        return storedUserData?.user_email || jwtUser?.user_email || jwtUser?.email || user?.email || "";
    };

    const currentUserEmail = getUserEmail();
    
    // Fetch subusers for dropdown - only if we have a valid email
    const { data: subusersData = [], isLoading: isLoadingSubusers, error: subusersError } = useSubusers(currentUserEmail, !!currentUserEmail);
    
    // Debug logging for subusers data
    useEffect(() => {
        // console.log('============ ADMINGROUPS DEBUG ============');
        // console.log('👤 User from AuthContext:', user);
        // console.log('📧 Current User Email (from getUserEmail):', currentUserEmail);
        // console.log('📋 Subusers Data:', subusersData);
        // console.log('📊 Subusers Count:', subusersData?.length || 0);
        // console.log('⏳ Is Loading Subusers:', isLoadingSubusers);
        // console.log('❌ Subusers Error:', subusersError);
        // console.log('==========================================');
    }, [user, currentUserEmail, subusersData, isLoadingSubusers, subusersError]);
    
    const [groups, setGroups] = useState<Group[]>([]);
    const [licenseSummary, setLicenseSummary] = useState<LicenseSummary | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [groupsCached, setGroupsCached] = useState(false); // ✅ Cache flag

    useEffect(() => {
        // ✅ Only fetch if not cached
        if (!groupsCached) {
            fetchGroups();
        }
    }, [groupsCached]);

    const fetchGroups = async (silent: boolean = false) => {
        // ✅ If already cached, skip fetching
        if (groupsCached && !silent) {
            return;
        }

        if (!silent) {
            setIsLoading(true);
        }

        // Skip API calls for demo mode - use dummy data
        if (isDemo) {
            setIsLoading(false);
            setGroupsCached(true); // ✅ Mark as cached
            setIsError(false);
            setGroups([
                {
                    id: 1,
                    name: 'Engineering Team',
                    description: 'Software development and engineering',
                    created: '2024-01-15',
                    licenseStats: {
                        totalAllocated: 100,
                        distributedToUsers: 45,
                        available: 55,
                        usagePercent: 45
                    },
                    users: [
                        {
                            id: 1,
                            name: 'John Doe',
                            email: 'john.doe@demo.com',
                            role: 'User',
                            department: 'Engineering',
                            license: 5,
                            profile: 'Developer'
                        },
                        {
                            id: 2,
                            name: 'Jane Smith',
                            email: 'jane.smith@demo.com',
                            role: 'User',
                            department: 'Engineering',
                            license: 3,
                            profile: 'Senior Developer'
                        }
                    ]
                },
                {
                    id: 2,
                    name: 'Marketing Team',
                    description: 'Marketing and communications',
                    created: '2024-02-20',
                    licenseStats: {
                        totalAllocated: 50,
                        distributedToUsers: 28,
                        available: 22,
                        usagePercent: 56
                    },
                    users: [
                        {
                            id: 3,
                            name: 'Mike Johnson',
                            email: 'mike.johnson@demo.com',
                            role: 'User',
                            department: 'Marketing',
                            license: 2,
                            profile: 'Marketing Manager'
                        }
                    ]
                },
                {
                    id: 3,
                    name: 'Sales Team',
                    description: 'Sales and business development',
                    created: '2024-03-10',
                    licenseStats: {
                        totalAllocated: 75,
                        distributedToUsers: 62,
                        available: 13,
                        usagePercent: 82.7
                    },
                    users: [
                        {
                            id: 4,
                            name: 'Sarah Williams',
                            email: 'sarah.williams@demo.com',
                            role: 'User',
                            department: 'Sales',
                            license: 4,
                            profile: 'Sales Executive'
                        },
                        {
                            id: 5,
                            name: 'Tom Brown',
                            email: 'tom.brown@demo.com',
                            role: 'User',
                            department: 'Sales',
                            license: 3,
                            profile: 'Account Manager'
                        }
                    ]
                }
            ]);
            setLicenseSummary({
                totalAllocated: 225,
                totalDistributed: 135,
                totalAvailable: 90,
                overallUsagePercent: 60
            });
            return;
        }
        
        try {
            if (!silent) {
                setIsLoading(true);
                setIsError(false);
            }
            
            // console.log(silent ? '🔄 Silently refreshing groups...' : '🔍 Dashboard: Fetching groups from /api/Group/with-users...');
            const response = await apiClient.getGroupsWithUsers();
            
            // console.log('📥 Dashboard: API Response:', response);
            
            if (!response.success) {
                // console.error('❌ Dashboard: API returned error:', response.error || response.message);
                setIsError(true);
                return;
            }

            if (!response.data?.groups?.data || !Array.isArray(response.data.groups.data)) {
                // console.error('❌ Dashboard: Unexpected response structure:', response.data);
                setIsError(true);
                return;
            }

            const apiGroups = response.data.groups.data;
            const apiLicenseSummary = response.data.groups.licenseSummary;
            // console.log('✅ Dashboard: Extracted API Groups:', apiGroups.length, 'groups');
            // console.log('📊 Dashboard: License Summary:', apiLicenseSummary);
            
            // Store license summary
            if (apiLicenseSummary) {
                setLicenseSummary(apiLicenseSummary);
            }
            
            // Transform API response to component format
            const transformedGroups: Group[] = apiGroups.map((group: any, index: number) => {
                const cleanId = group.groupId?.toString().replace(/^group-/, '') || `${index + 1}`;
                
                return {
                    id: parseInt(cleanId) || index + 1,
                    name: group.groupName || 'Unnamed Group',
                    description: group.groupDescription || '',
                    created: new Date().toISOString().split('T')[0],
                    licenseStats: group.licenseStats || null,
                    users: group.users?.map((user: any, userIndex: number) => {
                        const cleanUserId = user.userId?.toString().replace(/^user-/, '') || `${userIndex + 1}`;
                        return {
                            id: parseInt(cleanUserId) || userIndex + 1,
                            name: user.name || 'Unknown',
                            email: user.email || '',
                            role: (user.role === 'user' ? 'User' : 'Subuser') as 'User' | 'Subuser',
                            // department: user.department || 'N/A',
                            license: user.licenseCount || user.license || 0,
                            profile: user.role || 'User'
                        };
                    }) || []
                };
            });
            
            setGroups(transformedGroups);
            setGroupsCached(true); // ✅ Mark as cached after successful load
            // console.log('✅ Dashboard: Groups loaded:', transformedGroups.length);
        } catch (error: any) {
            // console.error('❌ Dashboard: Error fetching groups:', error);
            if (!silent) {
                setIsError(true);
            }
        } finally {
            if (!silent) {
                setIsLoading(false);
            }
        }
    };

    const fetchAvailableUsers = async () => {
        try {
            setIsLoadingUsers(true);
            // console.log('🔍 Fetching available users and subusers...');
            
            // Get current authenticated user email from AuthContext
            const authenticatedEmail = user?.email;
            
            if (!authenticatedEmail) {
                // console.error('❌ No authenticated user found in AuthContext');
                // console.log('🔍 AuthContext user object:', user);
                setAvailableUsers([]);
                setIsLoadingUsers(false);
                return;
            }
            
            // console.log('👤 Authenticated user from AuthContext:', authenticatedEmail);
            // console.log('👤 User role:', user?.role);
            
            // Fetch subusers for the authenticated user
            // console.log('📡 Calling API: /api/Subuser/by-superuser/' + authenticatedEmail);
            const subusersResponse = await apiClient.getSubusersBySuperuser(authenticatedEmail);
            
            // console.log('📥 API Response:', subusersResponse);
            
            const usersList: Array<{ email: string; name: string; type: string }> = [];
            
            // Add subusers to the list
            if (subusersResponse.success && Array.isArray(subusersResponse.data)) {
                // console.log('✅ Raw subusers data:', subusersResponse.data);
                
                subusersResponse.data.forEach((subuser: any) => {
                    // console.log('🔹 Processing subuser:', subuser);
                    if (subuser.email || subuser.subuser_email) {
                        const subuserEmail = subuser.email || subuser.subuser_email;
                        const subuserName = subuser.name || subuser.subuser_name || subuserEmail;
                        
                        usersList.push({
                            email: subuserEmail,
                            name: subuserName,
                            type: 'Subuser'
                        });
                        // console.log('✅ Added subuser to dropdown:', subuserEmail);
                    }
                });
                // console.log('✅ Found subusers:', subusersResponse.data.length);
            } else {
                // console.log('ℹ️ No subusers found for authenticated user:', authenticatedEmail);
                // console.log('ℹ️ API response success:', subusersResponse.success);
                // console.log('ℹ️ API response data:', subusersResponse.data);
            }
            
            setAvailableUsers(usersList);
            // console.log('✅ Total users loaded for dropdown:', usersList.length);
            // console.log('✅ Final dropdown list:', usersList);
        } catch (error: any) {
            // console.error('❌ Error fetching subusers:', error);
            // console.error('❌ Error details:', error.message, error.stack);
        } finally {
            setIsLoadingUsers(false);
        }
    };

    const [expandedGroups, setExpandedGroups] = useState<number[]>([]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showAddUserModal, setShowAddUserModal] = useState(false);
    const [showTransferModal, setShowTransferModal] = useState(false);
    const [showRevokeModal, setShowRevokeModal] = useState(false);
    const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);
    const [userEmail, setUserEmail] = useState('');
    const [makeGroupAdmin, setMakeGroupAdmin] = useState(false);
    const [availableUsers, setAvailableUsers] = useState<Array<{ email: string; name: string; type: string }>>([]);
    const [isLoadingUsers, setIsLoadingUsers] = useState(false);
    const [removingUser, setRemovingUser] = useState<{ groupId: number; userEmail: string } | null>(null);
    
    // Transfer modal state
    const [selectedMachines, setSelectedMachines] = useState<string[]>([]);
    const [selectedLicenses, setSelectedLicenses] = useState<string[]>([]);
    const [selectedTransferUser, setSelectedTransferUser] = useState('');
    const [availableMachines, setAvailableMachines] = useState<any[]>([]);
    const [availableLicenses, setAvailableLicenses] = useState<any[]>([]);
    const [isLoadingMachines, setIsLoadingMachines] = useState(false);
    
    // Revoke modal state
    const [selectedRevokeMachines, setSelectedRevokeMachines] = useState<string[]>([]);
    const [selectedRevokeLicenses, setSelectedRevokeLicenses] = useState<string[]>([]);
    const [selectedRevokeUser, setSelectedRevokeUser] = useState('');
    const [userMachines, setUserMachines] = useState<any[]>([]);
    const [userLicenses, setUserLicenses] = useState<any[]>([]);
    const [isLoadingUserAssets, setIsLoadingUserAssets] = useState(false);
    
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        licenseAllocation: 0,
        permission: '',
        status: 'active',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const totalUsers = groups.reduce((sum, group) => sum + group.users.length, 0);
    const [totalMachines, setTotalMachines] = useState(0);
    const [totalReports, setTotalReports] = useState(0);

    // Fetch total machines and reports for all group members
    useEffect(() => {
        if (groups.length > 0) {
            fetchMachinesAndReportsCount();
        }
    }, [groups]);

    const fetchMachinesAndReportsCount = async () => {
        // Skip API calls in demo mode - use static values
        if (isDemo) {
            setTotalMachines(47);
            setTotalReports(128);
            return;
        }

        try {
            let allMachines = 0;
            let allReports = 0;

            // Get all unique user emails from all groups
            const allGroupUsers = groups.flatMap(group => group.users);
            const uniqueUserEmails = [...new Set(allGroupUsers.map(user => user.email))];

            // Fetch machines and reports for each group member
            for (const userEmail of uniqueUserEmails) {
                if (!userEmail) continue;

                // Fetch machines count for this user
                try {
                    const machinesResponse = await apiClient.getMachinesByEmail(userEmail);
                    if (machinesResponse.success && machinesResponse.data) {
                        allMachines += machinesResponse.data.length;
                    }
                } catch (error) {
                    console.error(`Error fetching machines for ${userEmail}:`, error);
                }

                // Fetch reports count for this user
                try {
                    const reportsResponse = await apiClient.getAuditReportsByEmail(userEmail);
                    if (reportsResponse.success && reportsResponse.data) {
                        allReports += Array.isArray(reportsResponse.data) ? reportsResponse.data.length : 0;
                    }
                } catch (error) {
                    console.error(`Error fetching reports for ${userEmail}:`, error);
                }
            }

            setTotalMachines(allMachines);
            setTotalReports(allReports);
        } catch (error) {
            console.error('Error fetching group members machines/reports count:', error);
        }
    };

    const toggleGroup = (groupId: number) => {
        setExpandedGroups(prev =>
            prev.includes(groupId)
                ? prev.filter(id => id !== groupId)
                : [...prev, groupId]
        );
    };

    const handleAddGroup = () => {
        setFormData({ 
            name: '', 
            description: '', 
            licenseAllocation: 0, 
            permission: '', 
            status: 'active' 
        });
        setErrorMessage('');
        setShowAddModal(true);
    };

    const handleEditGroup = (group: Group) => {
        setSelectedGroup(group);
        setFormData({
            name: group.name,
            description: group.description,
            licenseAllocation: 0, // Will need to get from API response if available
            permission: '', // Will need to get from API response if available
            status: 'active', // Will need to get from API response if available
        });
        setErrorMessage('');
        setShowEditModal(true);
    };

    const handleDeleteGroup = (group: Group) => {
        setSelectedGroup(group);
        setShowDeleteModal(true);
    };

    const handleSaveNewGroup = async () => {
        try {
            setIsSubmitting(true);
            setErrorMessage('');
            
            const now = new Date().toISOString();
            const payload: CreateGroupPayload = {
                groupId: 0,
                groupName: formData.name,
                groupDescription: formData.description,
                groupLicenseAllocation: formData.licenseAllocation,
                groupPermission: formData.permission,
                status: formData.status,
                createdAt: now,
                updatedAt: now
            };
            
            // console.log('📤 Creating group with payload:', payload);
            const response = await apiClient.createGroup(payload);
            
            if (response.success) {
                // console.log('✅ Group created successfully:', response.data);
                setShowAddModal(false);
                setFormData({ name: '', description: '', licenseAllocation: 0, permission: '', status: 'active' });
                setErrorMessage('');
                // Silent refresh to get updated data
                await fetchGroups(true);
            } else {
                const errorMsg = response.error || response.message || 'Unknown error';
                // console.error('❌ Failed to create group:', errorMsg);
                
                // Parse license allocation error
                if (errorMsg.includes('License allocation') && errorMsg.includes('exceeds available licenses')) {
                    const availableMatch = errorMsg.match(/Available for allocation: (\d+)/);
                    const requestedMatch = errorMsg.match(/Requested: (\d+)/);
                    const maxMatch = errorMsg.match(/Max Licenses: (\d+)/);
                    
                    if (availableMatch && requestedMatch) {
                        setErrorMessage(`Cannot allocate ${requestedMatch[1]} licenses. Only ${availableMatch[1]} licenses available for allocation${maxMatch ? ` (out of ${maxMatch[1]} total)` : ''}.`);
                    } else {
                        setErrorMessage(errorMsg);
                    }
                } else {
                    setErrorMessage(errorMsg);
                }
            }
        } catch (error: any) {
            // console.error('❌ Error creating group:', error);
            setErrorMessage(error.message || 'An unexpected error occurred');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleSaveEditGroup = async () => {
        if (!selectedGroup) return;
        
        try {
            setIsSubmitting(true);
            setErrorMessage('');
            
            const now = new Date().toISOString();
            const payload: CreateGroupPayload = {
                groupId: selectedGroup.id,
                groupName: formData.name,
                groupDescription: formData.description,
                groupLicenseAllocation: formData.licenseAllocation,
                groupPermission: formData.permission,
                status: formData.status,
                createdAt: now, // API might ignore this, but keeping for consistency
                updatedAt: now
            };
            
            // console.log('📝 Updating group:', selectedGroup.id, 'Payload:', payload);
            const response = await apiClient.updateGroup(selectedGroup.id.toString(), payload);
            
            if (response.success) {
                // console.log('✅ Group updated successfully:', response.data);
                setShowEditModal(false);
                setErrorMessage('');
                setSelectedGroup(null);
                setFormData({ name: '', description: '', licenseAllocation: 0, permission: '', status: 'active' });
                // Silent refresh to get updated data
                await fetchGroups(true);
            } else {
                const errorMsg = response.error || response.message || 'Unknown error';
                // console.error('❌ Failed to update group:', errorMsg);
                setErrorMessage(errorMsg);
            }
        } catch (error: any) {
            // console.error('❌ Error updating group:', error);
            setErrorMessage(error.message || 'An unexpected error occurred');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleRemoveUserFromGroup = async (groupId: number, groupName: string, userEmail: string, userName: string) => {
        if (!confirm(`Are you sure you want to remove ${userName} (${userEmail}) from ${groupName}?`)) {
            return;
        }

        try {
            setRemovingUser({ groupId, userEmail });
            
            // console.log(`🗑️ Removing user ${userEmail} from group ${groupName}`);
            
            const response = await apiClient.removeUserFromGroupByEmail(groupId.toString(), userEmail);
            
            if (!response.success) {
                const errorMsg = response.error || response.message || 'Failed to remove user from group';
                // console.error('❌ Failed to remove user:', errorMsg);
                setRemovingUser(null);
                return;
            }
            
            // console.log('✅ User removed successfully');
            // Silent refresh to get updated data
            await fetchGroups(true);
        } catch (error) {
            // console.error('❌ Failed to remove user from group:', error);
        } finally {
            setRemovingUser(null);
        }
    };

    const handleConfirmDelete = async () => {
        if (!selectedGroup) return;
        
        try {
            setIsSubmitting(true);
            setErrorMessage('');
            
            // console.log('🗑️ Deleting group:', selectedGroup.id, selectedGroup.name);
            const response = await apiClient.deleteGroup(selectedGroup.id.toString());
            
            if (response.success) {
                // console.log('✅ Group deleted successfully');
                setShowDeleteModal(false);
                setSelectedGroup(null);
                // Silent refresh to get updated data
                await fetchGroups(true);
            } else {
                const errorMsg = response.error || response.message || 'Unknown error';
                // console.error('❌ Failed to delete group:', errorMsg);
                
                // Parse specific error messages for better user guidance
                if (errorMsg.toLowerCase().includes('assigned subusers') || errorMsg.toLowerCase().includes('has members')) {
                    setErrorMessage('Cannot delete group with assigned members. Please remove all users from this group before deleting it.');
                } else if (errorMsg.toLowerCase().includes('not found')) {
                    setErrorMessage('Group not found. It may have already been deleted.');
                } else if (errorMsg.toLowerCase().includes('permission') || errorMsg.toLowerCase().includes('unauthorized')) {
                    setErrorMessage('You do not have permission to delete this group.');
                } else {
                    setErrorMessage(errorMsg);
                }
            }
        } catch (error: any) {
            // console.error('❌ Error deleting group:', error);
            setErrorMessage(error.message || 'An unexpected error occurred while deleting the group.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleOpenAddUserModal = (group: Group) => {
        setSelectedGroup(group);
        setUserEmail('');
        setMakeGroupAdmin(false);
        setErrorMessage('');
        setShowAddUserModal(true);
        
        // Log details when modal opens
        // console.log('🔓 Add User Modal Opened');
        // console.log('📧 User Email for API:', currentUserEmail);
        // console.log('📋 Available Subusers:', subusersData);
        // console.log('🔢 Subusers Count:', subusersData?.length || 0);
        
        // Check if subusers are being fetched
        if (!currentUserEmail) {
            // console.error('❌ No user email found! Cannot fetch subusers.');
            setErrorMessage('Unable to load users. Please ensure you are logged in.');
        } else if (subusersData.length === 0) {
            // console.warn('⚠️ No subusers found for user:', currentUserEmail);
        }
    };

    const handleAddUserToGroup = async () => {
        if (!selectedGroup || !userEmail) return;
        
        try {
            setIsSubmitting(true);
            setErrorMessage('');
            
            // console.log('📤 Adding user to group:', selectedGroup.id, 'Email:', userEmail, 'As Group Admin:', makeGroupAdmin);
            const response = await apiClient.addUserToGroupByEmail(selectedGroup.id.toString(), userEmail);
            
            if (response.success) {
                // console.log('✅ User added successfully:', response.data);
                setShowAddUserModal(false);
                setUserEmail('');
                setMakeGroupAdmin(false);
                setErrorMessage('');
                setSelectedGroup(null);
                // Silent refresh to get updated data
                await fetchGroups(true);
            } else {
                const errorMsg = response.error || response.message || 'Unknown error';
                // console.error('❌ Failed to add user:', errorMsg);
                setErrorMessage(errorMsg);
            }
        } catch (error: any) {
            // console.error('❌ Error adding user:', error);
            setErrorMessage(error.message || 'An unexpected error occurred');
        } finally {
            setIsSubmitting(false);
        }
    };

    // Transfer Modal Handlers
    const handleOpenTransferModal = async (group: Group) => {
        setSelectedGroup(group);
        setShowTransferModal(true);
        setSelectedMachines([]);
        setSelectedLicenses([]);
        setSelectedTransferUser('');
        setErrorMessage('');
        
        // Fetch available machines and licenses for admin/superadmin
        await fetchAvailableMachinesAndLicenses();
    };

    const fetchAvailableMachinesAndLicenses = async () => {
        try {
            setIsLoadingMachines(true);
            
            // Fetch machines for current admin user
            const machinesResponse = await apiClient.getMachinesByEmail(currentUserEmail);
            if (machinesResponse.success && machinesResponse.data) {
                setAvailableMachines(machinesResponse.data);
            }
            
            // Fetch available licenses - you may need to create this API endpoint
            // For now, using placeholder
            setAvailableLicenses([]);
            
        } catch (error: any) {
            console.error('Error fetching machines/licenses:', error);
            setErrorMessage('Failed to load available machines and licenses');
        } finally {
            setIsLoadingMachines(false);
        }
    };

    const handleTransferAssets = async () => {
        if (!selectedGroup || !selectedTransferUser) {
            setErrorMessage('Please select a user to transfer to');
            return;
        }
        
        if (selectedMachines.length === 0 && selectedLicenses.length === 0) {
            setErrorMessage('Please select at least one machine or license to transfer');
            return;
        }
        
        try {
            setIsSubmitting(true);
            setErrorMessage('');
            
            // Get MAC addresses for selected machines
            const macAddresses = availableMachines
                .filter(m => selectedMachines.includes(m.id))
                .map(m => m.mac_address);
            
            // Transfer machines using the API
            if (macAddresses.length > 0) {
                const response = await apiClient.transferMachinesToSubuser(selectedTransferUser, macAddresses);
                if (!response.success) {
                    throw new Error(response.error || 'Failed to transfer machines');
                }
            }
            
            // Transfer licenses (implement based on your API)
            // for (const licenseId of selectedLicenses) {
            //     await apiClient.transferLicense(licenseId, selectedTransferUser);
            // }
            
            setShowTransferModal(false);
            setSelectedMachines([]);
            setSelectedLicenses([]);
            setSelectedTransferUser('');
            await fetchGroups(true);
            
        } catch (error: any) {
            console.error('Transfer error:', error);
            setErrorMessage(error.message || 'Failed to transfer assets');
        } finally {
            setIsSubmitting(false);
        }
    };

    // Revoke Modal Handlers
    const handleOpenRevokeModal = async (group: Group) => {
        setSelectedGroup(group);
        setShowRevokeModal(true);
        setSelectedRevokeMachines([]);
        setSelectedRevokeLicenses([]);
        setSelectedRevokeUser('');
        setErrorMessage('');
    };

    const handleRevokeUserChange = async (userEmail: string) => {
        setSelectedRevokeUser(userEmail);
        if (!userEmail) {
            setUserMachines([]);
            setUserLicenses([]);
            return;
        }
        
        try {
            setIsLoadingUserAssets(true);
            
            // Fetch user's machines
            const machinesResponse = await apiClient.getMachinesByEmail(userEmail);
            if (machinesResponse.success && machinesResponse.data) {
                // Filter only unused/available machines
                const availableMachines = machinesResponse.data.filter((m: any) => !m.in_use);
                setUserMachines(availableMachines);
            }
            
            // Fetch user's licenses (implement based on your API)
            setUserLicenses([]);
            
        } catch (error: any) {
            console.error('Error fetching user assets:', error);
            setErrorMessage('Failed to load user assets');
        } finally {
            setIsLoadingUserAssets(false);
        }
    };

    const handleRevokeAssets = async () => {
        if (!selectedGroup || !selectedRevokeUser) {
            setErrorMessage('Please select a user');
            return;
        }
        
        if (selectedRevokeMachines.length === 0 && selectedRevokeLicenses.length === 0) {
            setErrorMessage('Please select at least one machine or license to revoke');
            return;
        }
        
        try {
            setIsSubmitting(true);
            setErrorMessage('');
            
            // Get MAC addresses for selected machines to revoke
            const macAddresses = userMachines
                .filter((m: any) => selectedRevokeMachines.includes(m.id))
                .map((m: any) => m.mac_address);
            
            // Revoke machines - transfer back to admin
            if (macAddresses.length > 0) {
                const response = await apiClient.transferMachinesToSubuser(currentUserEmail, macAddresses);
                if (!response.success) {
                    throw new Error(response.error || 'Failed to revoke machines');
                }
            }
            
            // Revoke licenses (implement based on your API)
            // for (const licenseId of selectedRevokeLicenses) {
            //     await apiClient.revokeLicense(licenseId);
            // }
            
            setShowRevokeModal(false);
            setSelectedRevokeMachines([]);
            setSelectedRevokeLicenses([]);
            setSelectedRevokeUser('');
            await fetchGroups(true);
            
        } catch (error: any) {
            console.error('Revoke error:', error);
            setErrorMessage(error.message || 'Failed to revoke assets');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <Helmet>
                <title>Groups - Admin Dashboard | D-Secure</title>
            </Helmet>

            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900">Groups</h1>
                        <p className="text-slate-600 mt-1">Manage user groups and permissions</p>
                    </div>
                    <button onClick={handleAddGroup} className="btn-primary flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        Add Group
                    </button>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
                    <div className="card !p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-slate-600">Total Groups</p>
                                <p className="text-3xl font-bold text-slate-900 mt-1">
                                    {isLoading ? (
                                        <span className="inline-block w-12 h-8 bg-slate-200 animate-pulse rounded"></span>
                                    ) : (
                                        groups.length
                                    )}
                                </p>
                            </div>
                            <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                                <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="card !p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-slate-600">Total Users</p>
                                <p className="text-3xl font-bold text-slate-900 mt-1">
                                    {isLoading ? (
                                        <span className="inline-block w-12 h-8 bg-slate-200 animate-pulse rounded"></span>
                                    ) : (
                                        totalUsers
                                    )}
                                </p>
                            </div>
                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="card !p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-slate-600">Total Machines</p>
                                <p className="text-3xl font-bold text-slate-900 mt-1">
                                    {isLoading ? (
                                        <span className="inline-block w-12 h-8 bg-slate-200 animate-pulse rounded"></span>
                                    ) : (
                                        totalMachines
                                    )}
                                </p>
                            </div>
                            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="card !p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-slate-600">Total Reports</p>
                                <p className="text-3xl font-bold text-slate-900 mt-1">
                                    {isLoading ? (
                                        <span className="inline-block w-12 h-8 bg-slate-200 animate-pulse rounded"></span>
                                    ) : (
                                        totalReports
                                    )}
                                </p>
                            </div>
                            <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                                <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="card !p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-slate-600">Total Available Licenses</p>
                                <p className="text-3xl font-bold text-slate-900 mt-1">
                                    {isLoading ? (
                                        <span className="inline-block w-12 h-8 bg-slate-200 animate-pulse rounded"></span>
                                    ) : (
                                        licenseSummary?.totalAllocated || 0
                                    )}
                                </p>
                                {licenseSummary && (
                                    <p className="text-xs text-slate-500 mt-1">
                                        {licenseSummary.totalDistributed} distributed
                                    </p>
                                )}
                            </div>
                            <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
                                <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="card !p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-slate-600">Unsed License Available</p>
                                <p className="text-3xl font-bold text-slate-900 mt-1">
                                    {isLoading ? (
                                        <span className="inline-block w-12 h-8 bg-slate-200 animate-pulse rounded"></span>
                                    ) : (
                                        licenseSummary?.totalAvailable || 0
                                    )}
                                </p>
                                {licenseSummary && (
                                    <p className="text-xs text-slate-500 mt-1">
                                        {licenseSummary.overallUsagePercent.toFixed(0)}% used
                                    </p>
                                )}
                            </div>
                            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Error Message */}
                {isError && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
                        <p className="font-medium">Failed to load groups</p>
                        <button
                            onClick={() => fetchGroups()}
                            className="mt-2 text-sm font-medium text-red-600 hover:text-red-800"
                        >
                            Try again
                        </button>
                    </div>
                )}

                {/* Loading State */}
                {isLoading && groups.length === 0 && (
                    <div className="flex justify-center items-center py-12">
                        <div className="text-center">
                            <svg className="animate-spin h-12 w-12 text-emerald-500 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            <p className="text-slate-600">Loading groups...</p>
                        </div>
                    </div>
                )}

                {/* Groups List with Expandable Users */}
                {!isLoading && groups.length > 0 && (
                    <div className="space-y-4">
                        {groups.map((group: Group) => (
                            <div key={group.id} className="card !p-0 overflow-hidden">
                            {/* Group Header */}
                            <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
                                <div className="flex items-center gap-4 flex-1">
                                    <button
                                        onClick={() => toggleGroup(group.id)}
                                        className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-lg flex items-center justify-center text-white font-semibold hover:shadow-lg transition-shadow"
                                    >
                                        {group.name.charAt(0)}
                                    </button>
                                    <div className="flex-1">
                                        <h3 className="text-lg font-semibold text-slate-900">{group.name}</h3>
                                        <p className="text-sm text-slate-600">{group.description}</p>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-emerald-100 text-emerald-800">
                                            {group.users.length} users
                                        </span>
                                        <span className="text-sm text-slate-500">
                                            Created: {new Date(group.created).toLocaleDateString()}
                                        </span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 ml-4">
                                    <button
                                        onClick={() => handleEditGroup(group)}
                                        className="px-3 py-1.5 text-sm text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDeleteGroup(group)}
                                        className="px-3 py-1.5 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                    >
                                        Delete
                                    </button>
                                    <button
                                        onClick={() => toggleGroup(group.id)}
                                        className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                                    >
                                        <svg
                                            className={`w-5 h-5 text-slate-600 transition-transform ${expandedGroups.includes(group.id) ? 'rotate-180' : ''}`}
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </button>
                                </div>
                            </div>

                            {/* Expandable Users Table */}
                            {expandedGroups.includes(group.id) && (
                                <div>
                                    {/* Add User, Transfer, and Revoke Buttons */}
                                    <div className="px-6 py-3 bg-slate-50 border-b border-slate-200 flex justify-end gap-2">
                                        <button
                                            onClick={() => handleOpenTransferModal(group)}
                                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 text-sm font-medium"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                                            </svg>
                                            Transfer
                                        </button>
                                        <button
                                            onClick={() => handleOpenRevokeModal(group)}
                                            className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors flex items-center gap-2 text-sm font-medium"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                                            </svg>
                                            Revoke
                                        </button>
                                        <button
                                            onClick={() => handleOpenAddUserModal(group)}
                                            className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors flex items-center gap-2 text-sm font-medium"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                            </svg>
                                            Add User
                                        </button>
                                    </div>
                                    
                                    <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead className="bg-slate-100 border-b border-slate-200">
                                            <tr>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                                                    User Name
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                                                    Email
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                                                    Role
                                                </th>
                                                {/* <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                                                    Department
                                                </th> */}
                                                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                                                    License
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                                                    Profile
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                                                    Actions
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-slate-200">
                                            {group.users.map((user: User) => (
                                                <tr key={user.id} className="hover:bg-slate-50 transition-colors">
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="flex items-center gap-3">
                                                            <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                                                                {user.name.charAt(0)}
                                                            </div>
                                                            <span className="font-medium text-slate-900">{user.name}</span>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                                                        {user.email}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${user.role === 'User'
                                                            ? 'bg-blue-100 text-blue-800'
                                                            : 'bg-purple-100 text-purple-800'
                                                            }`}>
                                                            {user.role}
                                                        </span>
                                                    </td>
                                                    {/* <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                                                        {user.department}
                                                    </td> */}
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                                            user.license > 0
                                                                ? 'bg-emerald-100 text-emerald-800'
                                                                : 'bg-slate-100 text-slate-800'
                                                        }`}>
                                                            {user.license}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                                                        {user.profile}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <button
                                                            onClick={() => handleRemoveUserFromGroup(group.id, group.name, user.email, user.name)}
                                                            disabled={removingUser?.groupId === group.id && removingUser?.userEmail === user.email}
                                                            className="px-3 py-1.5 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
                                                        >
                                                            {removingUser?.groupId === group.id && removingUser?.userEmail === user.email ? (
                                                                <>
                                                                    <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                                    </svg>
                                                                    Removing...
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                                    </svg>
                                                                    Remove
                                                                </>
                                                            )}
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                    </div>
                )}

                {/* Add User to Group Modal */}
                {showAddUserModal && selectedGroup && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowAddUserModal(false)}>
                        <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6" onClick={(e) => e.stopPropagation()}>
                            <h3 className="text-xl font-semibold text-slate-900 mb-4">Add User to {selectedGroup.name}</h3>
                            
                            {/* Error Message */}
                            {errorMessage && (
                                <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                                    <div className="flex items-start gap-3">
                                        <svg className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <div className="flex-1">
                                            <p className="text-sm font-medium text-red-800 mb-1">Unable to Add User</p>
                                            <p className="text-sm text-red-700">{errorMessage}</p>
                                        </div>
                                        <button
                                            onClick={() => setErrorMessage('')}
                                            className="text-red-400 hover:text-red-600"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            )}
                            
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">
                                        Select User <span className="text-red-500">*</span>
                                    </label>
                                    {isLoadingSubusers ? (
                                        <div className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-slate-50 flex items-center gap-2">
                                            <svg className="animate-spin h-4 w-4 text-emerald-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            <span className="text-sm text-slate-600">Loading users...</span>
                                        </div>
                                    ) : !currentUserEmail ? (
                                        <div className="w-full px-3 py-2 border border-red-300 rounded-lg bg-red-50">
                                            <p className="text-sm text-red-700">⚠️ User not authenticated. Please log in again.</p>
                                        </div>
                                    ) : subusersError ? (
                                        <div className="w-full px-3 py-2 border border-red-300 rounded-lg bg-red-50">
                                            <p className="text-sm text-red-700">❌ Error loading subusers. Please try again.</p>
                                        </div>
                                    ) : subusersData && subusersData.length > 0 ? (
                                        <select
                                            value={userEmail}
                                            onChange={(e) => setUserEmail(e.target.value)}
                                            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                            required
                                        >
                                            <option value="">Select a user...</option>
                                            <optgroup label="Subuser List">
                                                {subusersData.map((subuser: any) => (
                                                    <option key={subuser.subuser_email} value={subuser.subuser_email}>
                                                        {subuser.subuser_email}
                                                    </option>
                                                ))}
                                            </optgroup>
                                        </select>
                                    ) : (
                                        <div className="space-y-2">
                                            <div className="w-full px-3 py-2 border border-amber-300 rounded-lg bg-amber-50">
                                                <p className="text-sm text-amber-800 font-medium">⚠️ No subusers available</p>
                                                <p className="text-xs text-amber-700 mt-1">
                                                    Current user: <strong>{currentUserEmail}</strong>
                                                </p>
                                                <p className="text-xs text-amber-700">
                                                    Please create subusers first in the Subusers section.
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                    <p className="mt-1 text-xs text-slate-500">
                                        💡 Select a subuser from your account to add to this group.
                                    </p>
                                </div>
                                
                                {/* Group Admin Checkbox */}
                                <div>
                                    <label className="flex items-center gap-3 cursor-pointer group">
                                        <input
                                            type="checkbox"
                                            checked={makeGroupAdmin}
                                            onChange={(e) => setMakeGroupAdmin(e.target.checked)}
                                            className="w-4 h-4 text-emerald-600 border-slate-300 rounded focus:ring-2 focus:ring-emerald-500 cursor-pointer"
                                        />
                                        <div className="flex-1">
                                            <span className="text-sm font-medium text-slate-700 group-hover:text-emerald-600 transition-colors">
                                                Make this user a Group Admin
                                            </span>
                                            <p className="text-xs text-slate-500 mt-0.5">
                                                Group Admins can transfer and revoke machines/licenses within this group
                                            </p>
                                        </div>
                                    </label>
                                </div>
                            </div>
                            
                            <div className="flex gap-3 mt-6">                                <button 
                                    onClick={() => setShowAddUserModal(false)} 
                                    className="flex-1 px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50"
                                    disabled={isSubmitting}
                                >
                                    Cancel
                                </button>
                                <button 
                                    onClick={handleAddUserToGroup} 
                                    className="flex-1 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                    disabled={isSubmitting || !userEmail}
                                >
                                    {isSubmitting ? (
                                        <>
                                            <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Adding...
                                        </>
                                    ) : (
                                        'Add User'
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Add Group Modal */}
                {showAddModal && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowAddModal(false)}>
                        <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                            <h3 className="text-xl font-semibold text-slate-900 mb-4">Add New Group</h3>
                            
                            {/* Error Message */}
                            {errorMessage && (
                                <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                                    <div className="flex items-start gap-3">
                                        <svg className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <div className="flex-1">
                                            <p className="text-sm font-medium text-red-800 mb-1">Unable to Create Group</p>
                                            <p className="text-sm text-red-700">{errorMessage}</p>
                                        </div>
                                        <button
                                            onClick={() => setErrorMessage('')}
                                            className="text-red-400 hover:text-red-600"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            )}
                            
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">
                                        Group Name <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                        placeholder="Enter group name"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">
                                        Description <span className="text-red-500">*</span>
                                    </label>
                                    <textarea
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                        placeholder="Enter description"
                                        rows={3}
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">
                                        License Allocation <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="number"
                                        value={formData.licenseAllocation}
                                        onChange={(e) => setFormData({ ...formData, licenseAllocation: parseInt(e.target.value) || 0 })}
                                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                        placeholder="Enter license allocation"
                                        min="0"
                                        required
                                    />
                                    <p className="mt-1 text-xs text-slate-500">
                                        💡 Allocate only the number of licenses available in your account. Check with admin if unsure.
                                    </p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">
                                        Permission <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        value={formData.permission}
                                        onChange={(e) => setFormData({ ...formData, permission: e.target.value })}
                                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                        required
                                    >
                                        <option value="">Select permission</option>
                                        <option value="read">Read</option>
                                        <option value="write">Write</option>
                                        <option value="admin">Admin</option>
                                        <option value="full">Full Access</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">
                                        Status <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        value={formData.status}
                                        onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                        required
                                    >
                                        <option value="active">Active</option>
                                        <option value="inactive">Inactive</option>
                                        <option value="suspended">Suspended</option>
                                    </select>
                                </div>
                            </div>
                            <div className="flex gap-3 mt-6">
                                <button 
                                    onClick={() => setShowAddModal(false)} 
                                    className="flex-1 px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50"
                                    disabled={isSubmitting}
                                >
                                    Cancel
                                </button>
                                <button 
                                    onClick={handleSaveNewGroup} 
                                    className="flex-1 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                    disabled={isSubmitting || !formData.name || !formData.description || !formData.permission}
                                >
                                    {isSubmitting ? (
                                        <>
                                            <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Creating...
                                        </>
                                    ) : (
                                        'Add Group'
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Edit Group Modal */}
                {showEditModal && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowEditModal(false)}>
                        <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                            <h3 className="text-xl font-semibold text-slate-900 mb-4">Edit Group</h3>
                            
                            {/* Error Message */}
                            {errorMessage && (
                                <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                                    <div className="flex items-start gap-3">
                                        <svg className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <div className="flex-1">
                                            <p className="text-sm font-medium text-red-800 mb-1">Unable to Update Group</p>
                                            <p className="text-sm text-red-700">{errorMessage}</p>
                                        </div>
                                        <button
                                            onClick={() => setErrorMessage('')}
                                            className="text-red-400 hover:text-red-600"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            )}
                            
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">
                                        Group Name <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">
                                        Description <span className="text-red-500">*</span>
                                    </label>
                                    <textarea
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                        rows={3}
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">
                                        License Allocation <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="number"
                                        value={formData.licenseAllocation}
                                        onChange={(e) => setFormData({ ...formData, licenseAllocation: parseInt(e.target.value) || 0 })}
                                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                        placeholder="Enter license allocation"
                                        min="0"
                                        required
                                    />
                                    <p className="mt-1 text-xs text-slate-500">
                                        💡 Allocate only the number of licenses available in your account.
                                    </p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">
                                        Permission <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        value={formData.permission}
                                        onChange={(e) => setFormData({ ...formData, permission: e.target.value })}
                                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                        required
                                    >
                                        <option value="">Select permission</option>
                                        <option value="read">Read</option>
                                        <option value="write">Write</option>
                                        <option value="admin">Admin</option>
                                        <option value="full">Full Access</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">
                                        Status <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        value={formData.status}
                                        onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                        required
                                    >
                                        <option value="active">Active</option>
                                        <option value="inactive">Inactive</option>
                                        <option value="suspended">Suspended</option>
                                    </select>
                                </div>
                            </div>
                            <div className="flex gap-3 mt-6">
                                <button 
                                    onClick={() => setShowEditModal(false)} 
                                    className="flex-1 px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50"
                                    disabled={isSubmitting}
                                >
                                    Cancel
                                </button>
                                <button 
                                    onClick={handleSaveEditGroup} 
                                    className="flex-1 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                    disabled={isSubmitting || !formData.name || !formData.description || !formData.permission}
                                >
                                    {isSubmitting ? (
                                        <>
                                            <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Saving...
                                        </>
                                    ) : (
                                        'Save Changes'
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Delete Confirmation Modal */}
                {showDeleteModal && selectedGroup && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => !isSubmitting && setShowDeleteModal(false)}>
                        <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6" onClick={(e) => e.stopPropagation()}>
                            <h3 className="text-xl font-semibold text-slate-900 mb-4">Delete Group</h3>
                            
                            {/* Error Message */}
                            {errorMessage && (
                                <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                                    <div className="flex items-start gap-3">
                                        <svg className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <div className="flex-1">
                                            <p className="text-sm font-medium text-red-800 mb-1">Unable to Delete Group</p>
                                            <p className="text-sm text-red-700">{errorMessage}</p>
                                            {errorMessage.toLowerCase().includes('assigned members') && (
                                                <div className="mt-3 p-2 bg-amber-50 border border-amber-200 rounded">
                                                    <p className="text-xs text-amber-800 font-medium mb-1">💡 How to fix:</p>
                                                    <ol className="text-xs text-amber-700 list-decimal list-inside space-y-1">
                                                        <li>Expand this group in the list</li>
                                                        <li>Remove all users from the group</li>
                                                        <li>Then try deleting again</li>
                                                    </ol>
                                                </div>
                                            )}
                                        </div>
                                        <button
                                            onClick={() => setErrorMessage('')}
                                            className="text-red-400 hover:text-red-600"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            )}
                            
                            <p className="text-slate-600 mb-6">
                                Are you sure you want to delete the group <strong>"{selectedGroup.name}"</strong>? This action cannot be undone.
                            </p>
                            <div className="flex gap-3">
                                <button 
                                    onClick={() => setShowDeleteModal(false)} 
                                    className="flex-1 px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50"
                                    disabled={isSubmitting}
                                >
                                    Cancel
                                </button>
                                <button 
                                    onClick={handleConfirmDelete} 
                                    className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? (
                                        <>
                                            <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Deleting...
                                        </>
                                    ) : (
                                        'Delete'
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Transfer Modal */}
                {showTransferModal && selectedGroup && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowTransferModal(false)}>
                        <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                            <h3 className="text-xl font-semibold text-slate-900 mb-4">Transfer Machines & Licenses</h3>
                            
                            {errorMessage && (
                                <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                                    <p className="text-sm text-red-700">{errorMessage}</p>
                                </div>
                            )}
                            
                            <div className="space-y-6">
                                {/* Select User */}
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">
                                        Transfer To User <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        value={selectedTransferUser}
                                        onChange={(e) => setSelectedTransferUser(e.target.value)}
                                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="">Select a user...</option>
                                        {selectedGroup.users.map((user) => (
                                            <option key={user.email} value={user.email}>
                                                {user.name} ({user.email})
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* Available Machines */}
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">
                                        Select Machines to Transfer
                                    </label>
                                    {isLoadingMachines ? (
                                        <div className="flex items-center justify-center py-8">
                                            <svg className="animate-spin h-8 w-8 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                        </div>
                                    ) : availableMachines.length > 0 ? (
                                        <div className="space-y-3">
                                            {/* Dropdown to select machine */}
                                            <select
                                                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                onChange={(e) => {
                                                    const machineId = e.target.value;
                                                    if (machineId && !selectedMachines.includes(machineId)) {
                                                        setSelectedMachines([...selectedMachines, machineId]);
                                                    }
                                                    e.target.value = ''; // Reset dropdown
                                                }}
                                                value=""
                                            >
                                                <option value="">Select a machine...</option>
                                                {availableMachines
                                                    .filter(machine => !selectedMachines.includes(machine.id))
                                                    .map((machine: any) => (
                                                        <option key={machine.id} value={machine.id}>
                                                            {machine.machine_name || 'Unnamed Machine'} - {machine.mac_address}
                                                        </option>
                                                    ))}
                                            </select>
                                            
                                            {/* Selected machines display */}
                                            {selectedMachines.length > 0 && (
                                                <div className="border border-blue-200 rounded-lg bg-blue-50 p-3">
                                                    <p className="text-xs font-medium text-blue-800 mb-2">Selected Machines ({selectedMachines.length})</p>
                                                    <div className="flex flex-wrap gap-2">
                                                        {selectedMachines.map((machineId) => {
                                                            const machine = availableMachines.find(m => m.id === machineId);
                                                            return machine ? (
                                                                <div key={machineId} className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-full text-sm border border-blue-300">
                                                                    <span className="text-slate-700 font-medium">{machine.machine_name || 'Unnamed'}</span>
                                                                    <button
                                                                        onClick={() => setSelectedMachines(selectedMachines.filter(id => id !== machineId))}
                                                                        className="text-blue-600 hover:text-blue-800 hover:bg-blue-100 rounded-full p-0.5"
                                                                    >
                                                                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                                        </svg>
                                                                    </button>
                                                                </div>
                                                            ) : null;
                                                        })}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    ) : (
                                        <p className="text-sm text-slate-500 py-4">No available machines to transfer</p>
                                    )}
                                </div>

                                {/* Available Licenses */}
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">
                                        Select Licenses to Transfer
                                    </label>
                                    {availableLicenses.length > 0 ? (
                                        <div className="space-y-3">
                                            {/* Dropdown to select license */}
                                            <select
                                                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                onChange={(e) => {
                                                    const licenseId = e.target.value;
                                                    if (licenseId && !selectedLicenses.includes(licenseId)) {
                                                        setSelectedLicenses([...selectedLicenses, licenseId]);
                                                    }
                                                    e.target.value = ''; // Reset dropdown
                                                }}
                                                value=""
                                            >
                                                <option value="">Select a license...</option>
                                                {availableLicenses
                                                    .filter(license => !selectedLicenses.includes(license.id))
                                                    .map((license: any) => (
                                                        <option key={license.id} value={license.id}>
                                                            License #{license.id}
                                                        </option>
                                                    ))}
                                            </select>
                                            
                                            {/* Selected licenses display */}
                                            {selectedLicenses.length > 0 && (
                                                <div className="border border-blue-200 rounded-lg bg-blue-50 p-3">
                                                    <p className="text-xs font-medium text-blue-800 mb-2">Selected Licenses ({selectedLicenses.length})</p>
                                                    <div className="flex flex-wrap gap-2">
                                                        {selectedLicenses.map((licenseId) => {
                                                            const license = availableLicenses.find(l => l.id === licenseId);
                                                            return license ? (
                                                                <div key={licenseId} className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-full text-sm border border-blue-300">
                                                                    <span className="text-slate-700 font-medium">License #{license.id}</span>
                                                                    <button
                                                                        onClick={() => setSelectedLicenses(selectedLicenses.filter(id => id !== licenseId))}
                                                                        className="text-blue-600 hover:text-blue-800 hover:bg-blue-100 rounded-full p-0.5"
                                                                    >
                                                                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                                        </svg>
                                                                    </button>
                                                                </div>
                                                            ) : null;
                                                        })}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    ) : (
                                        <p className="text-sm text-slate-500 py-4">No available licenses to transfer</p>
                                    )}
                                </div>
                            </div>
                            
                            <div className="flex gap-3 mt-6">
                                <button 
                                    onClick={() => setShowTransferModal(false)} 
                                    className="flex-1 px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50"
                                    disabled={isSubmitting}
                                >
                                    Cancel
                                </button>
                                <button 
                                    onClick={handleTransferAssets} 
                                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                    disabled={isSubmitting || !selectedTransferUser || (selectedMachines.length === 0 && selectedLicenses.length === 0)}
                                >
                                    {isSubmitting ? (
                                        <>
                                            <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Transferring...
                                        </>
                                    ) : (
                                        'Transfer'
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Revoke Modal */}
                {showRevokeModal && selectedGroup && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowRevokeModal(false)}>
                        <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                            <h3 className="text-xl font-semibold text-slate-900 mb-4">Revoke Machines & Licenses</h3>
                            
                            {errorMessage && (
                                <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                                    <p className="text-sm text-red-700">{errorMessage}</p>
                                </div>
                            )}
                            
                            <div className="space-y-6">
                                {/* Select User */}
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">
                                        Select User <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        value={selectedRevokeUser}
                                        onChange={(e) => handleRevokeUserChange(e.target.value)}
                                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                                    >
                                        <option value="">Select a user...</option>
                                        {selectedGroup.users.map((user) => (
                                            <option key={user.email} value={user.email}>
                                                {user.name} ({user.email})
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* User's Available Machines */}
                                {selectedRevokeUser && (
                                    <>
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                                Select Machines to Revoke (Not In Use)
                                            </label>
                                            {isLoadingUserAssets ? (
                                                <div className="flex items-center justify-center py-8">
                                                    <svg className="animate-spin h-8 w-8 text-orange-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                    </svg>
                                                </div>
                                            ) : userMachines.length > 0 ? (
                                                <div className="space-y-3">
                                                    {/* Dropdown to select machine */}
                                                    <select
                                                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                                                        onChange={(e) => {
                                                            const machineId = e.target.value;
                                                            if (machineId && !selectedRevokeMachines.includes(machineId)) {
                                                                setSelectedRevokeMachines([...selectedRevokeMachines, machineId]);
                                                            }
                                                            e.target.value = ''; // Reset dropdown
                                                        }}
                                                        value=""
                                                    >
                                                        <option value="">Select a machine...</option>
                                                        {userMachines
                                                            .filter(machine => !selectedRevokeMachines.includes(machine.id))
                                                            .map((machine: any) => (
                                                                <option key={machine.id} value={machine.id}>
                                                                    {machine.machine_name || 'Unnamed Machine'} - {machine.mac_address}
                                                                </option>
                                                            ))}
                                                    </select>
                                                    
                                                    {/* Selected machines display */}
                                                    {selectedRevokeMachines.length > 0 && (
                                                        <div className="border border-orange-200 rounded-lg bg-orange-50 p-3">
                                                            <p className="text-xs font-medium text-orange-800 mb-2">Selected Machines ({selectedRevokeMachines.length})</p>
                                                            <div className="flex flex-wrap gap-2">
                                                                {selectedRevokeMachines.map((machineId) => {
                                                                    const machine = userMachines.find(m => m.id === machineId);
                                                                    return machine ? (
                                                                        <div key={machineId} className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-full text-sm border border-orange-300">
                                                                            <span className="text-slate-700 font-medium">{machine.machine_name || 'Unnamed'}</span>
                                                                            <button
                                                                                onClick={() => setSelectedRevokeMachines(selectedRevokeMachines.filter(id => id !== machineId))}
                                                                                className="text-orange-600 hover:text-orange-800 hover:bg-orange-100 rounded-full p-0.5"
                                                                            >
                                                                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                                                </svg>
                                                                            </button>
                                                                        </div>
                                                                    ) : null;
                                                                })}
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            ) : (
                                                <p className="text-sm text-slate-500 py-4">No available machines to revoke</p>
                                            )}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                                Select Licenses to Revoke (Not In Use)
                                            </label>
                                            {userLicenses.length > 0 ? (
                                                <div className="space-y-3">
                                                    {/* Dropdown to select license */}
                                                    <select
                                                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                                                        onChange={(e) => {
                                                            const licenseId = e.target.value;
                                                            if (licenseId && !selectedRevokeLicenses.includes(licenseId)) {
                                                                setSelectedRevokeLicenses([...selectedRevokeLicenses, licenseId]);
                                                            }
                                                            e.target.value = ''; // Reset dropdown
                                                        }}
                                                        value=""
                                                    >
                                                        <option value="">Select a license...</option>
                                                        {userLicenses
                                                            .filter(license => !selectedRevokeLicenses.includes(license.id))
                                                            .map((license: any) => (
                                                                <option key={license.id} value={license.id}>
                                                                    License #{license.id}
                                                                </option>
                                                            ))}
                                                    </select>
                                                    
                                                    {/* Selected licenses display */}
                                                    {selectedRevokeLicenses.length > 0 && (
                                                        <div className="border border-orange-200 rounded-lg bg-orange-50 p-3">
                                                            <p className="text-xs font-medium text-orange-800 mb-2">Selected Licenses ({selectedRevokeLicenses.length})</p>
                                                            <div className="flex flex-wrap gap-2">
                                                                {selectedRevokeLicenses.map((licenseId) => {
                                                                    const license = userLicenses.find(l => l.id === licenseId);
                                                                    return license ? (
                                                                        <div key={licenseId} className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-full text-sm border border-orange-300">
                                                                            <span className="text-slate-700 font-medium">License #{license.id}</span>
                                                                            <button
                                                                                onClick={() => setSelectedRevokeLicenses(selectedRevokeLicenses.filter(id => id !== licenseId))}
                                                                                className="text-orange-600 hover:text-orange-800 hover:bg-orange-100 rounded-full p-0.5"
                                                                            >
                                                                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                                                </svg>
                                                                            </button>
                                                                        </div>
                                                                    ) : null;
                                                                })}
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            ) : (
                                                <p className="text-sm text-slate-500 py-4">No available licenses to revoke</p>
                                            )}
                                        </div>
                                    </>
                                )}
                            </div>
                            
                            <div className="flex gap-3 mt-6">
                                <button 
                                    onClick={() => setShowRevokeModal(false)} 
                                    className="flex-1 px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50"
                                    disabled={isSubmitting}
                                >
                                    Cancel
                                </button>
                                <button 
                                    onClick={handleRevokeAssets} 
                                    className="flex-1 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                    disabled={isSubmitting || !selectedRevokeUser || (selectedRevokeMachines.length === 0 && selectedRevokeLicenses.length === 0)}
                                >
                                    {isSubmitting ? (
                                        <>
                                            <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Revoking...
                                        </>
                                    ) : (
                                        'Revoke'
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}


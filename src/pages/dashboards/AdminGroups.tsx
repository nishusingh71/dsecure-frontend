import { Helmet } from 'react-helmet-async';
import { useState, useEffect } from 'react';
import { apiClient, type Group as APIGroup, type GroupUser, type CreateGroupPayload } from '@/utils/enhancedApiClient';
import { useAuth } from '@/auth/AuthContext';
import { useSubusers } from '@/hooks/useSubusers';
import { authService } from '@/utils/authService';

interface User {
    id: number;
    name: string;
    email: string;
    role: 'User' | 'Subuser';
    department: string;
    license: number;
    profile: string;
}

interface Group {
    id: number;
    name: string;
    description: string;
    created: string;
    users: User[];
}

export default function AdminGroups() {
    const { user } = useAuth();
    
    // ✅ Get current user email from multiple sources (same as AdminReports)
    const getUserEmail = (): string => {
        const storedUser = localStorage.getItem("user_data");
        const authUser = localStorage.getItem("authUser");

        let storedUserData = null;
        if (storedUser) {
            try {
                storedUserData = JSON.parse(storedUser);
            } catch (e) {
                console.error("Error parsing user_data:", e);
            }
        }

        if (!storedUserData && authUser) {
            try {
                storedUserData = JSON.parse(authUser);
            } catch (e) {
                console.error("Error parsing authUser:", e);
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
        console.log('============ ADMINGROUPS DEBUG ============');
        console.log('👤 User from AuthContext:', user);
        console.log('📧 Current User Email (from getUserEmail):', currentUserEmail);
        console.log('📋 Subusers Data:', subusersData);
        console.log('📊 Subusers Count:', subusersData?.length || 0);
        console.log('⏳ Is Loading Subusers:', isLoadingSubusers);
        console.log('❌ Subusers Error:', subusersError);
        console.log('==========================================');
    }, [user, currentUserEmail, subusersData, isLoadingSubusers, subusersError]);
    
    const [groups, setGroups] = useState<Group[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        fetchGroups();
    }, []);

    const fetchGroups = async () => {
        try {
            setIsLoading(true);
            setIsError(false);
            
            console.log('🔍 Dashboard: Fetching groups from /api/Group/with-users...');
            const response = await apiClient.getGroupsWithUsers();
            
            console.log('📥 Dashboard: API Response:', response);
            
            if (!response.success) {
                console.error('❌ Dashboard: API returned error:', response.error || response.message);
                setIsError(true);
                return;
            }

            if (!response.data?.groups?.data || !Array.isArray(response.data.groups.data)) {
                console.error('❌ Dashboard: Unexpected response structure:', response.data);
                setIsError(true);
                return;
            }

            const apiGroups = response.data.groups.data;
            console.log('✅ Dashboard: Extracted API Groups:', apiGroups.length, 'groups');
            
            // Transform API response to component format
            const transformedGroups: Group[] = apiGroups.map((group: APIGroup, index: number) => {
                const cleanId = group.groupId?.toString().replace(/^group-/, '') || `${index + 1}`;
                
                return {
                    id: parseInt(cleanId) || index + 1,
                    name: group.groupName || 'Unnamed Group',
                    description: group.groupDescription || '',
                    created: new Date().toISOString().split('T')[0],
                    users: group.users?.map((user: GroupUser, userIndex: number) => {
                        const cleanUserId = user.userId?.toString().replace(/^user-/, '') || `${userIndex + 1}`;
                        return {
                            id: parseInt(cleanUserId) || userIndex + 1,
                            name: user.name || 'Unknown',
                            email: user.email || '',
                            role: (user.role === 'user' ? 'User' : 'Subuser') as 'User' | 'Subuser',
                            department: user.department || 'N/A',
                            license: user.license || 0,
                            profile: user.role || 'User'
                        };
                    }) || []
                };
            });
            
            setGroups(transformedGroups);
            console.log('✅ Dashboard: Groups loaded:', transformedGroups.length);
        } catch (error: any) {
            console.error('❌ Dashboard: Error fetching groups:', error);
            setIsError(true);
        } finally {
            setIsLoading(false);
        }
    };

    const fetchAvailableUsers = async () => {
        try {
            setIsLoadingUsers(true);
            console.log('🔍 Fetching available users and subusers...');
            
            // Get current authenticated user email from AuthContext
            const authenticatedEmail = user?.email;
            
            if (!authenticatedEmail) {
                console.error('❌ No authenticated user found in AuthContext');
                console.log('🔍 AuthContext user object:', user);
                setAvailableUsers([]);
                setIsLoadingUsers(false);
                return;
            }
            
            console.log('👤 Authenticated user from AuthContext:', authenticatedEmail);
            console.log('👤 User role:', user?.role);
            
            // Fetch subusers for the authenticated user
            console.log('📡 Calling API: /api/Subuser/by-superuser/' + authenticatedEmail);
            const subusersResponse = await apiClient.getSubusersBySuperuser(authenticatedEmail);
            
            console.log('📥 API Response:', subusersResponse);
            
            const usersList: Array<{ email: string; name: string; type: string }> = [];
            
            // Add subusers to the list
            if (subusersResponse.success && Array.isArray(subusersResponse.data)) {
                console.log('✅ Raw subusers data:', subusersResponse.data);
                
                subusersResponse.data.forEach((subuser: any) => {
                    console.log('🔹 Processing subuser:', subuser);
                    if (subuser.email || subuser.subuser_email) {
                        const subuserEmail = subuser.email || subuser.subuser_email;
                        const subuserName = subuser.name || subuser.subuser_name || subuserEmail;
                        
                        usersList.push({
                            email: subuserEmail,
                            name: subuserName,
                            type: 'Subuser'
                        });
                        console.log('✅ Added subuser to dropdown:', subuserEmail);
                    }
                });
                console.log('✅ Found subusers:', subusersResponse.data.length);
            } else {
                console.log('ℹ️ No subusers found for authenticated user:', authenticatedEmail);
                console.log('ℹ️ API response success:', subusersResponse.success);
                console.log('ℹ️ API response data:', subusersResponse.data);
            }
            
            setAvailableUsers(usersList);
            console.log('✅ Total users loaded for dropdown:', usersList.length);
            console.log('✅ Final dropdown list:', usersList);
        } catch (error: any) {
            console.error('❌ Error fetching subusers:', error);
            console.error('❌ Error details:', error.message, error.stack);
        } finally {
            setIsLoadingUsers(false);
        }
    };

    const [expandedGroups, setExpandedGroups] = useState<number[]>([]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showAddUserModal, setShowAddUserModal] = useState(false);
    const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);
    const [userEmail, setUserEmail] = useState('');
    const [availableUsers, setAvailableUsers] = useState<Array<{ email: string; name: string; type: string }>>([]);
    const [isLoadingUsers, setIsLoadingUsers] = useState(false);
    const [removingUser, setRemovingUser] = useState<{ groupId: number; userEmail: string } | null>(null);
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
            
            console.log('📤 Creating group with payload:', payload);
            const response = await apiClient.createGroup(payload);
            
            if (response.success) {
                console.log('✅ Group created successfully:', response.data);
                setShowAddModal(false);
                setFormData({ name: '', description: '', licenseAllocation: 0, permission: '', status: 'active' });
                setErrorMessage('');
                // Add new group to the list without refresh
                if (response.data?.group) {
                    const newGroup: Group = {
                        id: response.data.group.groupId,
                        name: response.data.group.groupName,
                        description: response.data.group.groupDescription,
                        created: response.data.group.createdAt,
                        users: []
                    };
                    setGroups(prev => [...prev, newGroup]);
                }
            } else {
                const errorMsg = response.error || response.message || 'Unknown error';
                console.error('❌ Failed to create group:', errorMsg);
                
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
            console.error('❌ Error creating group:', error);
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
            
            console.log('📝 Updating group:', selectedGroup.id, 'Payload:', payload);
            const response = await apiClient.updateGroup(selectedGroup.id.toString(), payload);
            
            if (response.success) {
                console.log('✅ Group updated successfully:', response.data);
                setShowEditModal(false);
                setErrorMessage('');
                // Update group in the list without refresh
                setGroups(prev => prev.map(g => 
                    g.id === selectedGroup.id 
                        ? { ...g, name: formData.name, description: formData.description }
                        : g
                ));
                setSelectedGroup(null);
                setFormData({ name: '', description: '', licenseAllocation: 0, permission: '', status: 'active' });
            } else {
                const errorMsg = response.error || response.message || 'Unknown error';
                console.error('❌ Failed to update group:', errorMsg);
                setErrorMessage(errorMsg);
            }
        } catch (error: any) {
            console.error('❌ Error updating group:', error);
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
            
            console.log(`🗑️ Removing user ${userEmail} from group ${groupName}`);
            
            const response = await apiClient.removeUserFromGroupByEmail(groupId.toString(), userEmail);
            
            if (!response.success) {
                const errorMsg = response.error || response.message || 'Failed to remove user from group';
                console.error('❌ Failed to remove user:', errorMsg);
                setRemovingUser(null);
                return;
            }
            
            console.log('✅ User removed successfully');
            // Remove user from group in state without refresh
            setGroups(prev => prev.map(g => 
                g.id === groupId 
                    ? { ...g, users: g.users.filter(u => u.email !== userEmail) }
                    : g
            ));
        } catch (error) {
            console.error('❌ Failed to remove user from group:', error);
        } finally {
            setRemovingUser(null);
        }
    };

    const handleConfirmDelete = async () => {
        if (!selectedGroup) return;
        
        try {
            setIsSubmitting(true);
            setErrorMessage('');
            
            console.log('🗑️ Deleting group:', selectedGroup.id, selectedGroup.name);
            const response = await apiClient.deleteGroup(selectedGroup.id.toString());
            
            if (response.success) {
                console.log('✅ Group deleted successfully');
                setShowDeleteModal(false);
                // Remove group from list without refresh
                setGroups(prev => prev.filter(g => g.id !== selectedGroup.id));
                setSelectedGroup(null);
            } else {
                const errorMsg = response.error || response.message || 'Unknown error';
                console.error('❌ Failed to delete group:', errorMsg);
                
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
            console.error('❌ Error deleting group:', error);
            setErrorMessage(error.message || 'An unexpected error occurred while deleting the group.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleOpenAddUserModal = (group: Group) => {
        setSelectedGroup(group);
        setUserEmail('');
        setErrorMessage('');
        setShowAddUserModal(true);
        
        // Log details when modal opens
        console.log('🔓 Add User Modal Opened');
        console.log('📧 User Email for API:', currentUserEmail);
        console.log('📋 Available Subusers:', subusersData);
        console.log('🔢 Subusers Count:', subusersData?.length || 0);
        
        // Check if subusers are being fetched
        if (!currentUserEmail) {
            console.error('❌ No user email found! Cannot fetch subusers.');
            setErrorMessage('Unable to load users. Please ensure you are logged in.');
        } else if (subusersData.length === 0) {
            console.warn('⚠️ No subusers found for user:', currentUserEmail);
        }
    };

    const handleAddUserToGroup = async () => {
        if (!selectedGroup || !userEmail) return;
        
        try {
            setIsSubmitting(true);
            setErrorMessage('');
            
            console.log('📤 Adding user to group:', selectedGroup.id, 'Email:', userEmail);
            const response = await apiClient.addUserToGroupByEmail(selectedGroup.id.toString(), userEmail);
            
            if (response.success) {
                console.log('✅ User added successfully:', response.data);
                setShowAddUserModal(false);
                setUserEmail('');
                setErrorMessage('');
                // Add user to group in state without refresh
                if (response.data?.user) {
                    const newUser: User = {
                        id: response.data.user.userId || Date.now(),
                        name: response.data.user.name || userEmail.split('@')[0],
                        email: userEmail,
                        role: response.data.user.role || 'User',
                        department: response.data.user.department || 'N/A',
                        license: response.data.user.license || 0,
                        profile: response.data.user.profile || 'Standard'
                    };
                    setGroups(prev => prev.map(g => 
                        g.id === selectedGroup.id 
                            ? { ...g, users: [...g.users, newUser] }
                            : g
                    ));
                }
                setSelectedGroup(null);
            } else {
                const errorMsg = response.error || response.message || 'Unknown error';
                console.error('❌ Failed to add user:', errorMsg);
                setErrorMessage(errorMsg);
            }
        } catch (error: any) {
            console.error('❌ Error adding user:', error);
            setErrorMessage(error.message || 'An unexpected error occurred');
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
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
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
                                <p className="text-sm text-slate-600">Avg Users/Group</p>
                                <p className="text-3xl font-bold text-slate-900 mt-1">
                                    {isLoading ? (
                                        <span className="inline-block w-12 h-8 bg-slate-200 animate-pulse rounded"></span>
                                    ) : (
                                        groups.length > 0 ? Math.round(totalUsers / groups.length) : 0
                                    )}
                                </p>
                            </div>
                            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
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
                            onClick={fetchGroups}
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
                                    {/* Add User Button */}
                                    <div className="px-6 py-3 bg-slate-50 border-b border-slate-200 flex justify-end">
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
                                                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                                                    Department
                                                </th>
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
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                                                        {user.department}
                                                    </td>
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
            </div>
        </>
    );
}

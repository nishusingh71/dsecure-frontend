import SEOHead from "../../components/SEOHead";
import { getSEOForPage } from "../../utils/seo";
import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams, useNavigate } from 'react-router-dom';
// import { usePermissions } from '@/hooks/usePermissions';
// import {
//     useGroupUsers,
//     useGroupResources,
//     useTransferResource,
//     useMarkUserResigned,
//     useResignedUsers,
//     type GroupUser,
//     type ResourceTransferRequest
// } from '@/hooks/useGroupResources';

/**
 * 🏢 GroupDetailPage
 * 
 * Comprehensive group resource management page for Group Admins.
 * Features:
 * - Resource summary cards (licenses, keys, users)
 * - User resource table with permission toggles
 * - Resource transfer modal
 * - Resigned user resource redistribution
 */
export default function GroupDetailPage() {
    const { groupId } = useParams<{ groupId: string }>();
    const navigate = useNavigate();
    // const { hasPermission, isSuperAdmin } = usePermissions();

    // State
    const [searchTerm, setSearchTerm] = useState('');
    const [showTransferModal, setShowTransferModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState<any | null>(null); // GroupUser
    const [transferTarget, setTransferTarget] = useState('');
    const [transferType, setTransferType] = useState<'license' | 'key'>('license');
    const [transferAmount, setTransferAmount] = useState(1);
    const [showResignedSection, setShowResignedSection] = useState(false);

    // Hooks
    // const { data: groupUsers = [], isLoading: usersLoading } = useGroupUsers(groupId || 'demo');
    // const { data: resources, isLoading: resourcesLoading } = useGroupResources(groupId || 'demo');
    // const { data: resignedUsers = [] } = useResignedUsers(groupId || 'demo');
    // const transferMutation = useTransferResource();
    // const resignMutation = useMarkUserResigned();
    
    // Temporary mock data
    const groupUsers: any[] = [];
    const usersLoading = false;
    const resources: any = {};
    const resourcesLoading = false;
    const resignedUsers: any[] = [];
    const hasPermission = (_: string) => true;
    const isSuperAdmin = true;
    const transferMutation = { isPending: false };

    // Permission checks - allow all actions in demo mode
    const isDemoMode = groupId === 'demo' || !groupId || groupId.startsWith('grp-');
    const canManageResources = isDemoMode || hasPermission('manage_group_resources') || isSuperAdmin;
    const canTransfer = isDemoMode || hasPermission('transfer_group_licenses') || isSuperAdmin;
    const canRedistribute = isDemoMode || hasPermission('redistribute_resources') || isSuperAdmin;

    // Filter users
    const filteredUsers = groupUsers.filter((user: any) =>
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const activeUsers = filteredUsers.filter((u: any) => u.status === 'active');

    // Handlers
    const handleTransfer = async () => {
        if (!selectedUser || !transferTarget || transferAmount < 1) return;

        const request: any = { // ResourceTransferRequest
            fromUserId: selectedUser.id,
            toUserId: transferTarget,
            resourceType: transferType,
            amount: transferAmount,
            reason: 'Admin transfer'
        };

        try {
            // await transferMutation.mutateAsync(request);
            console.log('Transfer:', request);
            setShowTransferModal(false);
            setSelectedUser(null);
            setTransferAmount(1);
        } catch (error) {
            console.error('Transfer failed:', error);
        }
    };



    const handleMarkResigned = async (user: any) => { // GroupUser
        if (!confirm(`Are you sure you want to mark ${user.name} as resigned? Their resources will need to be redistributed.`)) {
            return;
        }
        // await resignMutation.mutateAsync({ userId: user.id, groupId: groupId || 'demo' });
        console.log('Mark resigned:', user);
    };

    const openTransferModal = (user: any) => { // GroupUser
        setSelectedUser(user);
        setShowTransferModal(true);
    };

    if (usersLoading || resourcesLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
                <div className="text-center">
                    <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-emerald-600 border-r-transparent"></div>
                    <p className="mt-4 text-slate-600">Loading group resources...</p>
                </div>
            </div>
        );
    }

    return (
        <>
      {/* SEO Meta Tags */}
      <SEOHead seo={getSEOForPage("group-detail")} />
            <Helmet>
                <title>{resources?.groupName || 'Group'} Resources - Admin Dashboard | DSecureTech</title>
            </Helmet>

            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50/30">
                <div className="container-app py-8">
                    {/* Header */}
                    <div className="flex items-center gap-4 mb-8">
                        <button
                            onClick={() => navigate(-1)}
                            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                        >
                            <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                        <div>
                            <h1 className="text-2xl font-bold text-slate-900">{resources?.groupName || 'Group'} Resources</h1>
                            <p className="text-slate-600">Manage licenses, keys, and user permissions</p>
                        </div>
                    </div>

                    {/* Resource Summary Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        {/* Licenses Card */}
                        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                            <div className="flex items-center justify-between mb-4">
                                <div className="p-3 bg-emerald-100 rounded-lg">
                                    <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                                    </svg>
                                </div>
                                <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
                                    {Math.round(((resources?.allocatedLicenses || 0) / (resources?.totalLicenses || 1)) * 100)}% used
                                </span>
                            </div>
                            <p className="text-sm text-slate-500 mb-1">Total Licenses</p>
                            <p className="text-2xl font-bold text-slate-900">{resources?.totalLicenses || 0}</p>
                            <div className="mt-3 flex gap-4 text-xs">
                                <span className="text-emerald-600">Available: {resources?.availableLicenses || 0}</span>
                                <span className="text-slate-500">Allocated: {resources?.allocatedLicenses || 0}</span>
                            </div>
                        </div>

                        {/* Keys Card */}
                        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                            <div className="flex items-center justify-between mb-4">
                                <div className="p-3 bg-blue-100 rounded-lg">
                                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                                    </svg>
                                </div>
                            </div>
                            <p className="text-sm text-slate-500 mb-1">Active Keys</p>
                            <p className="text-2xl font-bold text-slate-900">{resources?.activeKeys || 0}</p>
                            <div className="mt-3 flex gap-4 text-xs">
                                <span className="text-blue-600">Total: {resources?.totalKeys || 0}</span>
                                <span className="text-red-500">Expired: {resources?.expiredKeys || 0}</span>
                            </div>
                        </div>

                        {/* Users Card */}
                        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                            <div className="flex items-center justify-between mb-4">
                                <div className="p-3 bg-purple-100 rounded-lg">
                                    <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                    </svg>
                                </div>
                            </div>
                            <p className="text-sm text-slate-500 mb-1">Total Users</p>
                            <p className="text-2xl font-bold text-slate-900">{resources?.totalUsers || 0}</p>
                            <div className="mt-3 flex gap-4 text-xs">
                                <span className="text-green-600">Active: {resources?.activeUsers || 0}</span>
                                <span className="text-slate-500">Inactive: {resources?.inactiveUsers || 0}</span>
                            </div>
                        </div>

                        {/* Resigned Users Card */}
                        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                            <div className="flex items-center justify-between mb-4">
                                <div className="p-3 bg-orange-100 rounded-lg">
                                    <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                    </svg>
                                </div>
                                {(resources?.resignedUsers || 0) > 0 && (
                                    <button
                                        onClick={() => setShowResignedSection(!showResignedSection)}
                                        className="text-xs font-medium text-orange-600 hover:text-orange-700"
                                    >
                                        View
                                    </button>
                                )}
                            </div>
                            <p className="text-sm text-slate-500 mb-1">Resigned Users</p>
                            <p className="text-2xl font-bold text-slate-900">{resources?.resignedUsers || 0}</p>
                            {(resources?.resignedUsers || 0) > 0 && (
                                <p className="mt-3 text-xs text-orange-600">⚠️ Resources pending redistribution</p>
                            )}
                        </div>
                    </div>

                    {/* Resigned Users Section */}
                    {showResignedSection && resignedUsers.length > 0 && canRedistribute && (
                        <div className="bg-orange-50 border border-orange-200 rounded-xl p-6 mb-8">
                            <h3 className="font-semibold text-orange-800 mb-4 flex items-center gap-2">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                </svg>
                                Pending Resource Redistribution
                            </h3>
                            <div className="space-y-3">
                                {resignedUsers.map((user: any) => (
                                    <div key={user.id} className="bg-white rounded-lg p-4 flex items-center justify-between">
                                        <div>
                                            <p className="font-medium text-slate-900">{user.name}</p>
                                            <p className="text-sm text-slate-600">{user.email}</p>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <div className="text-sm">
                                                <span className="text-orange-600 font-medium">{user.allocatedLicenses} licenses</span>
                                                <span className="text-slate-400 mx-2">•</span>
                                                <span className="text-orange-600 font-medium">{user.activeKeys} keys</span>
                                            </div>
                                            <button
                                                onClick={() => openTransferModal(user)}
                                                className="px-3 py-1.5 text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 rounded-lg transition-colors"
                                            >
                                                Redistribute
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* User Resources Table */}
                    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
                            <h2 className="font-semibold text-slate-900">User Resources</h2>
                            <div className="flex items-center gap-4">
                                <input
                                    type="text"
                                    placeholder="Search users..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                                />
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-slate-50">
                                    <tr className="text-left text-sm text-slate-600">
                                        <th className="px-6 py-3 font-medium">User</th>
                                        <th className="px-6 py-3 font-medium">Role</th>
                                        <th className="px-6 py-3 font-medium text-center">Licenses</th>
                                        <th className="px-6 py-3 font-medium text-center">Keys</th>
                                        <th className="px-6 py-3 font-medium">Status</th>
                                        <th className="px-6 py-3 font-medium text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {activeUsers.map((user: any) => (
                                        <tr key={user.id} className="hover:bg-slate-50">
                                            <td className="px-6 py-4">
                                                <div>
                                                    <p className="font-medium text-slate-900">{user.name}</p>
                                                    <p className="text-sm text-slate-500">{user.email}</p>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${user.role === 'admin' ? 'bg-purple-100 text-purple-800' :
                                                    user.role === 'manager' ? 'bg-blue-100 text-blue-800' :
                                                        user.role === 'user' ? 'bg-slate-100 text-slate-800' :
                                                            'bg-gray-100 text-gray-600'
                                                    }`}>
                                                    {user.role}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <span className="font-semibold text-slate-900">{user.allocatedLicenses}</span>
                                                <span className="text-xs text-slate-500 ml-1">/ {user.usedLicenses} used</span>
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <span className="font-semibold text-slate-900">{user.activeKeys}</span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                                                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                                                    Active
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    {canTransfer && (
                                                        <button
                                                            onClick={() => openTransferModal(user)}
                                                            className="px-3 py-1.5 text-xs font-medium text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition-colors"
                                                        >
                                                            Transfer
                                                        </button>
                                                    )}
                                                    {canManageResources && (
                                                        <button
                                                            onClick={() => handleMarkResigned(user)}
                                                            className="px-3 py-1.5 text-xs font-medium text-orange-700 bg-orange-50 hover:bg-orange-100 rounded-lg transition-colors"
                                                        >
                                                            Resign
                                                        </button>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {activeUsers.length === 0 && (
                            <div className="text-center py-12">
                                <p className="text-slate-500">No users found</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Transfer Modal */}
            {showTransferModal && selectedUser && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl shadow-xl max-w-md w-full">
                        <div className="p-6 border-b border-slate-200">
                            <h3 className="text-lg font-semibold text-slate-900">Transfer Resources</h3>
                            <p className="text-sm text-slate-600">From: {selectedUser.name}</p>
                        </div>

                        <div className="p-6 space-y-4">
                            {/* Resource Type */}
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Resource Type</label>
                                <div className="flex gap-4">
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="radio"
                                            name="resourceType"
                                            value="license"
                                            checked={transferType === 'license'}
                                            onChange={() => setTransferType('license')}
                                            className="text-emerald-600 focus:ring-emerald-500"
                                        />
                                        <span className="text-sm text-slate-700">Licenses ({selectedUser.allocatedLicenses} available)</span>
                                    </label>
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="radio"
                                            name="resourceType"
                                            value="key"
                                            checked={transferType === 'key'}
                                            onChange={() => setTransferType('key')}
                                            className="text-emerald-600 focus:ring-emerald-500"
                                        />
                                        <span className="text-sm text-slate-700">Keys ({selectedUser.activeKeys} available)</span>
                                    </label>
                                </div>
                            </div>

                            {/* Target User */}
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Transfer To</label>
                                <select
                                    value={transferTarget}
                                    onChange={(e) => setTransferTarget(e.target.value)}
                                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                                >
                                    <option value="">Select user...</option>
                                    {activeUsers.filter((u: any) => u.id !== selectedUser.id).map((user: any) => (
                                        <option key={user.id} value={user.id}>{user.name} ({user.email})</option>
                                    ))}
                                </select>
                            </div>

                            {/* Amount */}
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Amount</label>
                                <input
                                    type="number"
                                    min={1}
                                    max={transferType === 'license' ? selectedUser.allocatedLicenses : selectedUser.activeKeys}
                                    value={transferAmount}
                                    onChange={(e) => setTransferAmount(parseInt(e.target.value) || 1)}
                                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                                />
                            </div>
                        </div>

                        <div className="p-6 border-t border-slate-200 flex justify-end gap-3">
                            <button
                                onClick={() => {
                                    setShowTransferModal(false);
                                    setSelectedUser(null);
                                }}
                                className="px-4 py-2 text-slate-700 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleTransfer}
                                disabled={!transferTarget || transferAmount < 1 || transferMutation.isPending}
                                className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
                            >
                                {transferMutation.isPending && (
                                    <svg className="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                    </svg>
                                )}
                                Transfer
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

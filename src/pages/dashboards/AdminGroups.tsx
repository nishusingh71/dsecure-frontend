import SEOHead from "../../components/SEOHead";
import { getSEOForPage } from "../../utils/seo";
import { Helmet } from 'react-helmet-async';
import { useState } from 'react';

interface User {
    id: number;
    name: string;
    email: string;
    role: 'User' | 'Subuser';
    department: string;
    license: string;
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
    const [groups, setGroups] = useState<Group[]>([
        {
            id: 1,
            name: 'Engineering',
            description: 'Development and QA teams',
            created: '2024-01-15',
            users: [
                { id: 1, name: 'John Doe', email: 'john@example.com', role: 'User', department: 'Development', license: 'Enterprise', profile: 'Senior Developer' },
                { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Subuser', department: 'QA', license: 'Professional', profile: 'QA Lead' },
                { id: 3, name: 'Mike Johnson', email: 'mike@example.com', role: 'User', department: 'Development', license: 'Enterprise', profile: 'Full Stack Developer' },
            ]
        },
        {
            id: 2,
            name: 'Sales',
            description: 'Sales and business development',
            created: '2024-01-20',
            users: [
                { id: 4, name: 'Sarah Williams', email: 'sarah@example.com', role: 'User', department: 'Sales', license: 'Professional', profile: 'Sales Manager' },
                { id: 5, name: 'Tom Brown', email: 'tom@example.com', role: 'Subuser', department: 'Business Dev', license: 'Standard', profile: 'BD Executive' },
            ]
        },
        {
            id: 3,
            name: 'Marketing',
            description: 'Marketing and content team',
            created: '2024-02-01',
            users: [
                { id: 6, name: 'Emily Davis', email: 'emily@example.com', role: 'User', department: 'Marketing', license: 'Professional', profile: 'Marketing Head' },
                { id: 7, name: 'Chris Wilson', email: 'chris@example.com', role: 'Subuser', department: 'Content', license: 'Standard', profile: 'Content Writer' },
            ]
        },
    ]);

    const [expandedGroups, setExpandedGroups] = useState<number[]>([]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
    });

    const totalUsers = groups.reduce((sum, group) => sum + group.users.length, 0);

    const toggleGroup = (groupId: number) => {
        setExpandedGroups(prev =>
            prev.includes(groupId)
                ? prev.filter(id => id !== groupId)
                : [...prev, groupId]
        );
    };

    const handleAddGroup = () => {
        setFormData({ name: '', description: '' });
        setShowAddModal(true);
    };

    const handleEditGroup = (group: Group) => {
        setSelectedGroup(group);
        setFormData({
            name: group.name,
            description: group.description,
        });
        setShowEditModal(true);
    };

    const handleDeleteGroup = (group: Group) => {
        setSelectedGroup(group);
        setShowDeleteModal(true);
    };

    const handleSaveNewGroup = () => {
        const newGroup: Group = {
            id: Math.max(...groups.map(g => g.id)) + 1,
            name: formData.name,
            description: formData.description,
            created: new Date().toISOString().split('T')[0],
            users: [],
        };
        setGroups([...groups, newGroup]);
        setShowAddModal(false);
        setFormData({ name: '', description: '' });
    };

    const handleSaveEditGroup = () => {
        if (selectedGroup) {
            setGroups(groups.map(g =>
                g.id === selectedGroup.id
                    ? { ...g, name: formData.name, description: formData.description }
                    : g
            ));
            setShowEditModal(false);
            setSelectedGroup(null);
            setFormData({ name: '', description: '' });
        }
    };

    const handleConfirmDelete = () => {
        if (selectedGroup) {
            setGroups(groups.filter(g => g.id !== selectedGroup.id));
            setShowDeleteModal(false);
            setSelectedGroup(null);
        }
    };

    return (
        <>
      {/* SEO Meta Tags */}
      <SEOHead seo={getSEOForPage("admin-groups")} />
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
                                <p className="text-3xl font-bold text-slate-900 mt-1">{groups.length}</p>
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
                                <p className="text-3xl font-bold text-slate-900 mt-1">{totalUsers}</p>
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
                                    {groups.length > 0 ? Math.round(totalUsers / groups.length) : 0}
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

                {/* Groups List with Expandable Users */}
                <div className="space-y-4">
                    {groups.map((group) => (
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
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-slate-200">
                                            {group.users.map((user) => (
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
                                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${user.license === 'Enterprise'
                                                            ? 'bg-emerald-100 text-emerald-800'
                                                            : user.license === 'Professional'
                                                                ? 'bg-blue-100 text-blue-800'
                                                                : 'bg-slate-100 text-slate-800'
                                                            }`}>
                                                            {user.license}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                                                        {user.profile}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Add Group Modal */}
                {showAddModal && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowAddModal(false)}>
                        <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6" onClick={(e) => e.stopPropagation()}>
                            <h3 className="text-xl font-semibold text-slate-900 mb-4">Add New Group</h3>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Group Name</label>
                                    <input
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                        placeholder="Enter group name"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
                                    <textarea
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                        placeholder="Enter description"
                                        rows={3}
                                    />
                                </div>
                            </div>
                            <div className="flex gap-3 mt-6">
                                <button onClick={() => setShowAddModal(false)} className="flex-1 px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50">
                                    Cancel
                                </button>
                                <button onClick={handleSaveNewGroup} className="flex-1 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700">
                                    Add Group
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Edit Group Modal */}
                {showEditModal && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowEditModal(false)}>
                        <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6" onClick={(e) => e.stopPropagation()}>
                            <h3 className="text-xl font-semibold text-slate-900 mb-4">Edit Group</h3>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Group Name</label>
                                    <input
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
                                    <textarea
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                        rows={3}
                                    />
                                </div>
                            </div>
                            <div className="flex gap-3 mt-6">
                                <button onClick={() => setShowEditModal(false)} className="flex-1 px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50">
                                    Cancel
                                </button>
                                <button onClick={handleSaveEditGroup} className="flex-1 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700">
                                    Save Changes
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Delete Confirmation Modal */}
                {showDeleteModal && selectedGroup && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowDeleteModal(false)}>
                        <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6" onClick={(e) => e.stopPropagation()}>
                            <h3 className="text-xl font-semibold text-slate-900 mb-4">Delete Group</h3>
                            <p className="text-slate-600 mb-6">
                                Are you sure you want to delete the group <strong>"{selectedGroup.name}"</strong>? This action cannot be undone.
                            </p>
                            <div className="flex gap-3">
                                <button onClick={() => setShowDeleteModal(false)} className="flex-1 px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50">
                                    Cancel
                                </button>
                                <button onClick={handleConfirmDelete} className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

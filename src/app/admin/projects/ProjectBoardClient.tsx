'use client'

import { useState } from 'react';
import ProjectBoardCard from './ProjectBoardCard';

interface Builder {
    id: string;
    name: string;
}

interface ProjectBoardClientProps {
    initialProjects: any[];
    builders: Builder[];
}

export default function ProjectBoardClient({ initialProjects, builders }: ProjectBoardClientProps) {
    const [searchQuery, setSearchQuery] = useState('');
    const [builderFilter, setBuilderFilter] = useState('all');
    const [dateFilter, setDateFilter] = useState('all');

    const filteredProjects = initialProjects.filter(project => {
        // 1. Search Filter
        const matchesSearch = 
            project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (project.clients?.name || '').toLowerCase().includes(searchQuery.toLowerCase());
        
        // 2. Builder Filter
        const matchesBuilder = 
            builderFilter === 'all' || 
            project.builder_id === builderFilter;
            
        // 3. Date Filter
        if (!matchesSearch || !matchesBuilder) return false;

        if (dateFilter === 'all') return true;

        if (!project.due_date) return false;

        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const dueDate = new Date(project.due_date);
        dueDate.setHours(0, 0, 0, 0);

        if (dateFilter === 'today') {
            return dueDate.getTime() === today.getTime();
        }

        if (dateFilter === 'overdue') {
            return dueDate.getTime() < today.getTime() && project.status !== 'completed';
        }

        if (dateFilter === 'this_week') {
            const nextWeek = new Date(today);
            nextWeek.setDate(today.getDate() + 7);
            return dueDate.getTime() >= today.getTime() && dueDate.getTime() <= nextWeek.getTime();
        }

        if (dateFilter === 'this_month') {
            return dueDate.getMonth() === today.getMonth() && dueDate.getFullYear() === today.getFullYear();
        }

        return true;
    });

    const statuses = ['pending', 'in_progress', 'completed'];
    const statusLabels: Record<string, string> = {
        'pending': '🟡 Pending',
        'in_progress': '🔵 In Progress',
        'completed': '🟢 Completed'
    };

    return (
        <div>
            {/* Filter Bar */}
            <div style={{ 
                background: 'white', 
                padding: '16px 24px', 
                borderRadius: '16px', 
                border: '1px solid #e2e8f0', 
                marginBottom: '32px',
                display: 'flex',
                gap: '12px',
                alignItems: 'center',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
                flexWrap: 'wrap'
            }}>
                <div style={{ flex: 1, minWidth: '200px', position: 'relative' }}>
                    <input 
                        type="text" 
                        placeholder="Search project name or client..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        style={{
                            width: '100%',
                            padding: '10px 16px',
                            borderRadius: '10px',
                            border: '1px solid #cbd5e1',
                            fontSize: '14px',
                            outline: 'none',
                            background: '#f8fafc'
                        }}
                    />
                </div>
                
                <select 
                    value={builderFilter}
                    onChange={(e) => setBuilderFilter(e.target.value)}
                    style={{
                        padding: '10px 16px',
                        borderRadius: '10px',
                        border: '1px solid #cbd5e1',
                        fontSize: '14px',
                        outline: 'none',
                        background: '#f8fafc',
                        minWidth: '160px'
                    }}
                >
                    <option value="all">All Builders</option>
                    {builders.map(builder => (
                        <option key={builder.id} value={builder.id}>{builder.name}</option>
                    ))}
                </select>

                <select 
                    value={dateFilter}
                    onChange={(e) => setDateFilter(e.target.value)}
                    style={{
                        padding: '10px 16px',
                        borderRadius: '10px',
                        border: '1px solid #cbd5e1',
                        fontSize: '14px',
                        outline: 'none',
                        background: '#f8fafc',
                        minWidth: '160px'
                    }}
                >
                    <option value="all">All Dates</option>
                    <option value="today">Due Today</option>
                    <option value="this_week">Due This Week</option>
                    <option value="this_month">Due This Month</option>
                    <option value="overdue">Overdue 🔴</option>
                </select>

                {(searchQuery || builderFilter !== 'all' || dateFilter !== 'all') && (
                    <button 
                        onClick={() => { setSearchQuery(''); setBuilderFilter('all'); setDateFilter('all'); }}
                        style={{
                            background: 'none',
                            border: 'none',
                            color: '#ef4444',
                            fontSize: '13px',
                            fontWeight: '600',
                            cursor: 'pointer',
                            padding: '10px'
                        }}
                    >
                        Clear All
                    </button>
                )}
            </div>

            {/* The Kanban Board */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '32px' }}>
                {statuses.map(status => (
                    <div key={status} style={{ background: '#f8fafc', borderRadius: '24px', padding: '20px', minHeight: '600px', border: '1px solid #f1f5f9' }}>
                        <div style={{ marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 4px' }}>
                            <h2 style={{ fontSize: '13px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#475569', margin: 0 }}>
                                {statusLabels[status] || status}
                            </h2>
                            <span style={{ fontSize: '12px', background: 'white', color: '#0f172a', fontWeight: '800', padding: '4px 10px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                                {filteredProjects.filter(p => p.status === status).length}
                            </span>
                        </div>
                        
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            {filteredProjects.filter(p => p.status === status).map(project => (
                                <ProjectBoardCard key={project.id} project={project} />
                            ))}
                            {filteredProjects.filter(p => p.status === status).length === 0 && (
                                <div style={{ textAlign: 'center', padding: '60px 20px', border: '2px dashed #e2e8f0', borderRadius: '16px', color: '#94a3b8', fontSize: '14px', fontStyle: 'italic' }}>
                                    {searchQuery || builderFilter !== 'all' ? 'No matches found' : `No projects ${status.replace('_', ' ')}`}
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

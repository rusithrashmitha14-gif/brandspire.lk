'use client'

import { updateProjectStatus } from '../actions'

export default function StatusButtons({ 
    projectId, 
    currentStatus, 
    builderId, 
    userProfile 
}: { 
    projectId: string, 
    currentStatus: string, 
    builderId?: string,
    userProfile: any
}) {
    
    const isAuthorized = userProfile?.is_admin || (builderId && userProfile?.id === builderId);

    const handleStatusChange = async (newStatus: string) => {
        const res = await updateProjectStatus(projectId, newStatus);
        if (res?.error) {
            alert(res.error);
        }
    }

    if (currentStatus === 'pending') {
        return (
            <button 
                onClick={() => handleStatusChange('in_progress')}
                style={{
                    background: '#3b82f6',
                    color: 'white',
                    padding: '10px 24px',
                    borderRadius: '10px',
                    border: 'none',
                    fontWeight: '800',
                    fontSize: '14px',
                    cursor: 'pointer',
                    boxShadow: '0 4px 6px -1px rgba(59, 130, 246, 0.2)'
                }}
            >
                🚀 Start Website Build
            </button>
        );
    }

    if (currentStatus === 'in_progress') {
        return (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', alignItems: 'flex-end' }}>
                <button 
                    disabled={!isAuthorized}
                    onClick={() => handleStatusChange('completed')}
                    style={{
                        background: isAuthorized ? '#10b981' : '#cbd5e1',
                        color: 'white',
                        padding: '10px 24px',
                        borderRadius: '10px',
                        border: 'none',
                        fontWeight: '800',
                        fontSize: '14px',
                        cursor: isAuthorized ? 'pointer' : 'not-allowed',
                        boxShadow: isAuthorized ? '0 4px 6px -1px rgba(16, 185, 129, 0.2)' : 'none'
                    }}
                >
                    ✅ Mark as Finished
                </button>
                {!isAuthorized && (
                    <span style={{ fontSize: '11px', color: '#64748b', fontWeight: '600' }}>
                        🔒 Only assigned builder can finish
                    </span>
                )}
            </div>
        );
    }

    return null;
}

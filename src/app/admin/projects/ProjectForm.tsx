'use client'

import { useActionState, useState } from 'react'
import Link from 'next/link'
import { createProject, updateProject } from './actions'
import styles from '../admin-form.module.css'

type FormState = { error?: string } | null;

export default function ProjectForm({ 
    clients, 
    project, 
    subscriptions = [],
    builders = []
}: { 
    clients: any[], 
    project?: any, 
    subscriptions?: any[],
    builders?: any[]
}) {
    // Separate domain and hosting from subscriptions
    const domain = subscriptions.find(s => s.type === 'domain');
    const hosting = subscriptions.find(s => s.type === 'hosting');

    const [showServices, setShowServices] = useState(!!(domain || hosting));
    
    // Determine which action to use
    const projectAction = project 
        ? updateProject.bind(null, project.id) 
        : createProject;

    const [state, formAction, isPending] = useActionState<FormState, FormData>(projectAction, null);

    return (
        <form className={styles.formContainer} action={formAction} style={{ maxWidth: '600px', marginBottom: '40px' }}>
            <div className={styles.form}>
                <h2 style={{ fontSize: '18px', marginBottom: '16px' }}>
                    {project ? 'Edit Website Project' : 'Add New Project'}
                </h2>
                {state?.error && (
                    <div className={styles.errorAlert}>{state.error}</div>
                )}
                
                <div className={styles.inputGroup}>
                    <label htmlFor="name">Project Name *</label>
                    <input 
                        type="text" 
                        id="name" 
                        name="name" 
                        required 
                        defaultValue={project?.name}
                        placeholder="e.g. Website Redesign"
                    />
                </div>

                {!project && (
                    <div className={styles.inputGroup}>
                        <label htmlFor="client_id">Client (Optional)</label>
                        <select id="client_id" name="client_id" defaultValue={project?.client_id}>
                            <option value="">— No Client —</option>
                            {clients.map(c => (
                                <option key={c.id} value={c.id}>{c.name}</option>
                            ))}
                        </select>
                    </div>
                )}

                <div className={styles.inputGroup}>
                    <label htmlFor="status">Project Status</label>
                    <select id="status" name="status" defaultValue={project?.status || 'pending'}>
                        <option value="pending">🟡 Pending</option>
                        <option value="in_progress">🔵 In Progress</option>
                        <option value="completed">🟢 Completed</option>
                    </select>
                </div>

                {builders.length > 0 && (
                    <div className={styles.inputGroup}>
                        <label htmlFor="builder_id">Assigned Builder</label>
                        <select id="builder_id" name="builder_id" defaultValue={project?.builder_id || ''}>
                            <option value="">— Not Assigned —</option>
                            {builders.map((b: any) => (
                                <option key={b.id} value={b.id}>{b.name}</option>
                            ))}
                        </select>
                        <p style={{ fontSize: '11px', color: '#64748b', marginTop: '4px' }}>
                            Manually assign a builder to this project.
                        </p>
                    </div>
                )}

                <div className={styles.inputGroup}>
                    <label htmlFor="description">Description (Short)</label>
                    <input 
                        type="text"
                        id="description" 
                        name="description" 
                        defaultValue={project?.description}
                        placeholder="e.g. 5-page business site"
                    />
                </div>

                <div className={styles.inputGroup}>
                    <label htmlFor="due_date">Target Due Date *</label>
                    <input 
                        type="date" 
                        id="due_date" 
                        name="due_date" 
                        required
                        defaultValue={project?.due_date}
                    />
                </div>

                <div className={styles.inputGroup}>
                    <label htmlFor="brief">Project Brief / Requirements *</label>
                    <textarea 
                        id="brief" 
                        name="brief" 
                        required
                        defaultValue={project?.brief}
                        placeholder="Detailed requirements for the builder..."
                        rows={6}
                    />
                </div>

                <div className={styles.inputGroup}>
                    <label htmlFor="credentials">Technical Credentials (Logins)</label>
                    <textarea 
                        id="credentials" 
                        name="credentials" 
                        defaultValue={project?.credentials?.notes}
                        placeholder="CPanel, WordPress, or FTP details..."
                        rows={4}
                    />
                </div>

                {/* Service Section (now for both new and existing projects) */}
                <div style={{ marginTop: '24px', padding: '20px', background: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: showServices ? '16px' : '0' }}>
                        <h3 style={{ margin: 0, fontSize: '15px', color: '#1e293b' }}>Domain & Hosting (Optional)</h3>
                        <button 
                            type="button" 
                            onClick={() => setShowServices(!showServices)}
                            style={{ background: 'none', border: 'none', color: '#3b82f6', fontWeight: '600', cursor: 'pointer', fontSize: '13px' }}
                        >
                            {showServices ? '− Hide Details' : '+ Manage Details'}
                        </button>
                    </div>

                    {showServices && (
                        <div style={{ display: 'grid', gap: '20px' }}>
                            <div style={{ paddingTop: '12px', borderTop: '1px solid #e2e8f0' }}>
                                <h4 style={{ fontSize: '12px', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '12px' }}>Domain Service</h4>
                                {domain?.id && <input type="hidden" name="domain_id" value={domain.id} />}
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                                    <div className={styles.inputGroup} style={{ marginBottom: 0 }}>
                                        <label style={{ fontSize: '12px' }}>Domain Name</label>
                                        <input type="text" name="domain_name" defaultValue={domain?.name} placeholder="example.com" />
                                    </div>
                                    <div className={styles.inputGroup} style={{ marginBottom: 0 }}>
                                        <label style={{ fontSize: '12px' }}>Cost (LKR)</label>
                                        <input type="number" name="domain_cost" defaultValue={domain?.cost} placeholder="0" />
                                    </div>
                                    <div className={styles.inputGroup} style={{ marginBottom: 0 }}>
                                        <label style={{ fontSize: '12px' }}>Expiry Date</label>
                                        <input type="date" name="domain_expiry" defaultValue={domain?.expiry_date} />
                                    </div>
                                    <div className={styles.inputGroup} style={{ marginBottom: 0 }}>
                                        <label style={{ fontSize: '12px' }}>Billing Cycle</label>
                                        <select name="domain_billing_cycle" defaultValue={domain?.billing_cycle || 'yearly'}>
                                            <option value="monthly">Monthly</option>
                                            <option value="yearly">Yearly</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div style={{ paddingTop: '12px', borderTop: '1px solid #e2e8f0' }}>
                                <h4 style={{ fontSize: '12px', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '12px' }}>Hosting Service</h4>
                                {hosting?.id && <input type="hidden" name="hosting_id" value={hosting.id} />}
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                                    <div className={styles.inputGroup} style={{ marginBottom: 0 }}>
                                        <label style={{ fontSize: '12px' }}>Hosting Name</label>
                                        <input type="text" name="hosting_name" defaultValue={hosting?.name} placeholder="Basic Shared" />
                                    </div>
                                    <div className={styles.inputGroup} style={{ marginBottom: 0 }}>
                                        <label style={{ fontSize: '12px' }}>Provider</label>
                                        <input type="text" name="hosting_provider" defaultValue={hosting?.provider} placeholder="e.g. Hostinger" />
                                    </div>
                                    <div className={styles.inputGroup} style={{ marginBottom: 0 }}>
                                        <label style={{ fontSize: '12px' }}>Cost (LKR)</label>
                                        <input type="number" name="hosting_cost" defaultValue={hosting?.cost} placeholder="0" />
                                    </div>
                                    <div className={styles.inputGroup} style={{ marginBottom: 0 }}>
                                        <label style={{ fontSize: '12px' }}>Expiry Date</label>
                                        <input type="date" name="hosting_expiry" defaultValue={hosting?.expiry_date} />
                                    </div>
                                    <div className={styles.inputGroup} style={{ marginBottom: 0, gridColumn: 'span 2' }}>
                                        <label style={{ fontSize: '12px' }}>Billing Cycle</label>
                                        <select name="hosting_billing_cycle" defaultValue={hosting?.billing_cycle || 'yearly'}>
                                            <option value="monthly">Monthly</option>
                                            <option value="yearly">Yearly</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <div className={styles.formActions} style={{ marginTop: '32px' }}>
                    <button type="submit" className={styles.submitBtn} disabled={isPending}>
                        {isPending ? 'Saving...' : (project ? 'Update Project' : 'Create Project')}
                    </button>
                    {project && (
                        <Link href={`/admin/projects/${project.id}`} style={{ 
                            marginLeft: '12px', 
                            fontSize: '14px', 
                            color: '#64748b', 
                            textDecoration: 'none' 
                        }}>
                            Cancel
                        </Link>
                    )}
                </div>
            </div>
        </form>
    );
}

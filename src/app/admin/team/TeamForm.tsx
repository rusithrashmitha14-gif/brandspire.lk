'use client'

import { useActionState } from 'react'
import Link from 'next/link'
import { createTeamMember, updateTeamMember } from './actions'
import styles from '../admin-form.module.css'

type FormState = { error?: string } | null;

export default function TeamForm({ member }: { member?: any }) {
    const actionFunction = member 
        ? updateTeamMember.bind(null, member.id) 
        : createTeamMember;
        
    const [state, formAction, isPending] = useActionState<FormState, FormData>(actionFunction, null);

    return (
        <form className={styles.formContainer} action={formAction}>
            <div className={styles.form}>
                {state?.error && (
                    <div className={styles.errorAlert}>{state.error}</div>
                )}
                
                <div className={styles.inputGroup}>
                    <label htmlFor="name">Full Name *</label>
                    <input 
                        type="text" 
                        id="name" 
                        name="name" 
                        required 
                        defaultValue={member?.name}
                        placeholder="e.g. Kasun Jayawardena"
                    />
                </div>

                <div className={styles.inputGroup}>
                    <label htmlFor="role">Role / Job Title *</label>
                    <input 
                        type="text" 
                        id="role" 
                        name="role" 
                        required 
                        defaultValue={member?.role}
                        placeholder="e.g. Creative Director"
                    />
                </div>

                <div className={styles.inputGroup}>
                    <label htmlFor="email">Login Email (Must match their Supabase account)</label>
                    <input 
                        type="email" 
                        id="email" 
                        name="email" 
                        defaultValue={member?.email}
                        placeholder="e.g. kasun@brandspire.lk"
                    />
                </div>

                <div className={styles.inputGroup} style={{ flexDirection: 'row', alignItems: 'center', gap: '10px' }}>
                    <input 
                        type="checkbox" 
                        id="is_admin" 
                        name="is_admin" 
                        defaultChecked={member?.is_admin}
                        style={{ width: '18px', height: '18px' }}
                    />
                    <label htmlFor="is_admin" style={{ marginBottom: 0 }}>Grant Admin Privileges (Financial Access)</label>
                </div>

                <div className={styles.inputGroup}>
                    <label htmlFor="photo">Member Photo</label>
                    <input 
                        type="file" 
                        id="photo" 
                        name="photo" 
                        accept="image/*"
                    />
                    {member?.photo && (
                        <div className={styles.currentFile}>
                            <span>Current: </span>
                            <img src={member.photo} alt="current" style={{ height: '40px', width: '40px', borderRadius: '50%', objectFit: 'cover' }} />
                        </div>
                    )}
                    <input type="hidden" name="current_photo_url" defaultValue={member?.photo} />
                    <span className={styles.helperText}>Upload a square headshot (256x256 recommended).</span>
                </div>

                <div className={styles.formActions}>
                    <Link href="/admin/team" className={styles.cancelBtn}>
                        Cancel
                    </Link>
                    <button type="submit" className={styles.submitBtn} disabled={isPending}>
                        {isPending ? 'Saving...' : (member ? 'Update Member' : 'Add Member')}
                    </button>
                </div>
            </div>
        </form>
    );
}

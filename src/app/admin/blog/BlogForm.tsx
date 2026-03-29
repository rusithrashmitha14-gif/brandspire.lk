'use client'

import { useActionState } from 'react'
import Link from 'next/link'
import { createBlogPost, updateBlogPost } from './actions'
import styles from '../admin-form.module.css'

type FormState = { error?: string } | null;

export default function BlogForm({ post }: { post?: any }) {
    const actionFunction = post 
        ? updateBlogPost.bind(null, post.id) 
        : createBlogPost;
        
    const [state, formAction, isPending] = useActionState<FormState, FormData>(actionFunction, null);

    return (
        <form className={styles.formContainer} action={formAction}>
            <div className={styles.form}>
                {state?.error && (
                    <div className={styles.errorAlert}>{state.error}</div>
                )}
                
                <div className={styles.inputGroup}>
                    <label htmlFor="title">Post Title *</label>
                    <input 
                        type="text" 
                        id="title" 
                        name="title" 
                        required 
                        defaultValue={post?.title}
                        placeholder="e.g. 5 Tips for Local SEO"
                    />
                </div>

                <div className={styles.inputGroup}>
                    <label htmlFor="content">Content *</label>
                    <textarea 
                        id="content" 
                        name="content" 
                        required 
                        defaultValue={post?.content}
                        placeholder="Write your post content here..."
                        style={{ minHeight: '300px' }}
                    />
                </div>

                <div className={styles.inputGroup}>
                    <label htmlFor="meta_description">Meta Description</label>
                    <input 
                        type="text" 
                        id="meta_description" 
                        name="meta_description" 
                        defaultValue={post?.meta_description}
                        placeholder="Brief summary for SEO..."
                    />
                </div>

                <div className={styles.inputGroup}>
                    <label htmlFor="featured_image">Featured Image</label>
                    <input 
                        type="file" 
                        id="featured_image" 
                        name="featured_image" 
                        accept="image/*"
                    />
                    {post?.featured_image && (
                        <div className={styles.currentFile}>
                            <span>Current: </span>
                            <img src={post.featured_image} alt="current" style={{ height: '60px', width: '100px', objectFit: 'cover' }} />
                        </div>
                    )}
                    <input type="hidden" name="current_image_url" defaultValue={post?.featured_image} />
                </div>

                <div className={styles.formActions}>
                    <Link href="/admin/blog" className={styles.cancelBtn}>
                        Cancel
                    </Link>
                    <button type="submit" className={styles.submitBtn} disabled={isPending}>
                        {isPending ? 'Saving...' : (post ? 'Update Post' : 'Create Post')}
                    </button>
                </div>
            </div>
        </form>
    );
}

import React, { useState, useEffect, Fragment } from 'react'
import styles from "./blog.css"

export default function Blog() {
    const [hasError, setErrors] = useState(false)
    const [posts, setPosts] = useState("")
    const [thumb, setThumb] = useState("")
    useEffect(() => {
        fetch("https://goldko1.websiteseguro.com/blog/wp-json/wp/v2/posts?_embed")
            .then(res => res.json())
            .then(res => {
                let thumbs = []
                res.forEach(function(post) {
                    let a = post.content.rendered.split("<").filter(function(x) {
                        return x.indexOf("img") != -1
                    })
                    thumbs.push(post._embedded["wp:featuredmedia"][0].source_url);
                })
                setThumb(thumbs)
                setPosts(res)
            })
            .catch(() => setErrors(true))
    }, [])
    return (
        <>
            {
                !hasError && posts != "" ? 
                    <div className={styles.blogSection}>
                        <div className={styles.blogCards}>
                            {
                                posts.map((post, i) => {
                                    if (i >= 1) return null
                                    return (
                                        <div className={styles.blogCard}>
                                            <div className={styles.blogCardImage}>
                                                <img src={thumb[i]} />
                                            </div>
                                            <div className={styles.blogCardInfo}>
                                                <p>RECEITA DA SEMANA</p>
                                                <h2 className={styles.blogCardInfoTitle}>{post.title.rendered}</h2>
                                                <div className={styles.blogCardInfoPreview} dangerouslySetInnerHTML={{__html: post.excerpt.rendered}}></div>
                                                <a href={`/blog/post/${post.slug}`}>Receita completa</a>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                : null
            }
        </>
    )
}
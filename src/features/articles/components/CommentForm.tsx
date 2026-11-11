import { useState } from "react";
import "../../../styles/article/article-detail.scss";

interface CommentFormProps {
    placeholder?: string;
}
const CommentForm = ({placeholder="Ý kiến của bạn sẽ được biên tập trước khi đăng. Xin vui lòng gõ Tiếng Việt có dấu."}: CommentFormProps) => {
    const [content, setContent] = useState("");
    return (
        <section className="comment-form">
            <h2 className="comment-form__heading">Bình luận</h2>
            <form onSubmit={(e) => { e.preventDefault();
                }}>
                <textarea className="comment-form__textarea" placeholder={placeholder} 
                value={content} onChange={(e) => setContent(e.target.value)} 
                rows={4} required/>
                <div className="comment-form__actions">
                    <button type="submit" className="comment-form__submit">
                        Gửi bình luận
                    </button>
                </div>
            </form>

        </section>
    )
}
export default CommentForm;

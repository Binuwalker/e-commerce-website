import { Container } from "react-bootstrap";
import '../styles/Product.css';

export default function ProductReview({ reviews }) {
    return (
        <div>
            <Container>
                <h3>Reviews:</h3>
                <hr />
                {reviews && reviews.map(review => (
                    <div key={review._id} class="review-card my-3">
                        <div class="rating-outer">
                            <div class="rating-inner" style={{ width: `${review.rating / 5 * 100}%` }}></div>
                        </div>
                        <p class="review_user">by {review.user.name}</p>
                        <p class="review_comment">{review.comment}</p>

                        <hr />
                    </div>
                ))
                }
            </Container>
        </div>
    )
}
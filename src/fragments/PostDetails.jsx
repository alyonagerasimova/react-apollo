import React from 'react';
import {gql} from "@apollo/client";
import {CORE_COMMENT_FIELDS} from "./fragments";


const GET_POST_DETAILS = gql`
    ${CORE_COMMENT_FIELDS}
    query CommentsForPost($postId: ID!) {
    post(postId: $postId) {
      title
      body
      author
      comments {
      ...CORE_COMMENT_FIELDS
      }
    }
    }  
`;

const PostDetails = () => {
    return (
        <div>

        </div>
    );
};

export default PostDetails;
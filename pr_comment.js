const findBotComment = async (github, { owner, repo, issue_number}, commentIdentifier) => {
    const { data: comments } = await github.rest.issues.listComments({
        owner,
        repo,
        issue_number,
    });

    return comments.find(comment => {
        return comment.user.type === 'Bot' && comment.body.includes(`<!-- ${commentIdentifier} -->`);
    });
};

const postBotComment = async (github, { owner, repo, issue_number }, comment_id, commentIdentifier, commentBody) => {
    const body = `${commentBody}\n\n<!-- ${commentIdentifier} -->`;
    if (comment_id) {
        await github.rest.issues.updateComment({
            owner,
            repo,
            comment_id,
            body
        });
    } else {
        await github.rest.issues.createComment({
            issue_number,
            owner,
            repo,
            body
        });
    }
};

module.exports = async (github, context, commentIdentifier, commentBody) => {
    const {repo: { owner, repo }, issue: { number: issue_number }} = context;
    const botComment = await findBotComment(github, {owner, repo, issue_number}, commentIdentifier);
    await postBotComment(github, {owner, repo, issue_number}, botComment?.id, commentIdentifier, commentBody);
};

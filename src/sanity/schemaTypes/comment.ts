// schemas/comment.ts
import { Rule, SchemaTypeDefinition, PreviewValue } from 'sanity';

const comment: SchemaTypeDefinition = {
  name: 'comment',
  title: 'Comment',
  type: 'document',
  fields: [
    {
      name: 'post',
      title: 'Post',
      type: 'reference',
      to: [{ type: 'post' }],
      validation: (Rule: Rule) => Rule.required()
    },
    {
      name: 'content',
      title: 'Comment',
      type: 'text',
      validation: (Rule: Rule) => Rule.required().min(3).max(500)
    },
    {
      name: 'createdAt',
      title: 'Created At',
      type: 'datetime',
      options: {
        dateFormat: 'YYYY-MM-DDTHH:mm:ssZ',
      },
      initialValue: () => new Date().toISOString(),
    },
    {
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{ type: 'user' }],
      validation: (Rule: Rule) => Rule.required()
    },
    {
      name: 'userDetails',
      title: 'User Details',
      type: 'object',
      fields: [
        {
          name: 'clerkId',
          type: 'string',
          validation: (Rule: Rule) => Rule.required()
        },
        {
          name: 'firstName',
          type: 'string',
        },
        {
          name: 'lastName',
          type: 'string',
        },
        {
          name: 'imageUrl',
          type: 'url',
        },
      ],
    },
  ],
  preview: {
    select: {
      content: 'content',
      postTitle: 'post.title',
      authorName: 'userDetails.firstName'
    },
    prepare(selection: Record<string, any>): PreviewValue {
      const content = selection.content || 'No content';
      const postTitle = selection.postTitle || 'Untitled Post';
      const authorName = selection.authorName || 'Unknown Author';
    
      return {
        title: `Comment by ${authorName}`,
        subtitle: `on "${postTitle}"`,
        description: content,
      };
    }
  }
};

export default comment;


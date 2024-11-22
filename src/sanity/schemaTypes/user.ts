// schemas/user.ts
import { PreviewValue, Rule, SchemaTypeDefinition } from 'sanity';

const user: SchemaTypeDefinition = {
  name: 'user',
  title: 'User',
  type: 'document',
  fields: [
    {
      name: 'clerkId',
      title: 'Clerk ID',
      type: 'string',
      validation: (Rule: Rule) => Rule.required()
    },
    {
      name: 'firstName',
      title: 'First Name',
      type: 'string',
    },
    {
      name: 'lastName',
      title: 'Last Name',
      type: 'string',
    },
    {
      name: 'imageUrl',
      title: 'Profile Image URL',
      type: 'url',
    },
  ],
  preview: {
    select: {
      firstName: 'firstName',
      lastName: 'lastName',
      clerkId: 'clerkId'
    },
    prepare(selection: Record<string, any>): PreviewValue {
      const { firstName, lastName, clerkId } = selection;
      return {
        title: `${firstName} ${lastName}`,
        subtitle: `Clerk ID: ${clerkId}`,
      };
    }
  }
};

export default user;
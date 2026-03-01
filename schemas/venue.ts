export default {
  name: 'venue',
  title: 'Venue',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Venue Name',
      type: 'string',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'name', maxLength: 96 },
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'city',
      title: 'City',
      type: 'string',
      initialValue: 'Hong Kong'
    },
    {
      name: 'neighborhood',
      title: 'Neighborhood',
      type: 'string',
      description: 'e.g. Central, Wan Chai, Tsim Sha Tsui'
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Restaurant', value: 'restaurant' },
          { title: 'Bar', value: 'bar' },
          { title: 'Café', value: 'cafe' },
          { title: 'Hotel', value: 'hotel' },
          { title: 'Club', value: 'club' },
          { title: 'Gallery', value: 'gallery' },
          { title: 'Shop', value: 'shop' },
          { title: 'Experience', value: 'experience' },
        ]
      }
    },
    {
      name: 'case_for_going',
      title: 'The Case for Going',
      type: 'text',
      rows: 3,
      description: 'One compelling paragraph — why this place specifically'
    },
    {
      name: 'when_to_go',
      title: 'When to Go',
      type: 'string',
      description: 'e.g. Friday evenings, Sunday brunch, after 10pm'
    },
    {
      name: 'what_to_order',
      title: 'What to Order',
      type: 'text',
      rows: 2,
      description: 'Specific dishes, drinks, or experiences not to miss'
    },
    {
      name: 'insider_note',
      title: 'Insider Note',
      type: 'text',
      rows: 2,
      description: 'The thing only regulars know'
    },
    {
      name: 'price_range',
      title: 'Price Range',
      type: 'string',
      options: {
        list: [
          { title: '$', value: '$' },
          { title: '$$', value: '$$' },
          { title: '$$$', value: '$$$' },
          { title: '$$$$', value: '$$$$' },
        ]
      }
    },
    {
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' }
    },
    {
      name: 'image',
      title: 'Cover Image',
      type: 'image',
      options: { hotspot: true }
    },
    {
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      initialValue: false
    }
  ],
  preview: {
    select: { title: 'name', subtitle: 'neighborhood', media: 'image' }
  }
}

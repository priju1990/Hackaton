export default {
  items: [
    {
      name: 'Dashboard',
      url: '/dashboard',
      icon: 'icon-speedometer',
      
    },
    {
      title: true,
      name: 'Actions',
      wrapper: {            // optional wrapper object
        element: '',        // required valid HTML5 element tag
        attributes: {}        // optional valid JS object with JS API naming ex: { className: "my-class", style: { fontFamily: "Verdana" }, id: "my-id"}
      },
      class: ''             // optional class names space delimited list for title item ex: "text-center"
    },
    {
      name: 'User Creation',
      url: '/actions',
      icon: 'icon-puzzle',
      children: [
        {
          name: 'Create Roles',
          url: '/actions/createRoles',
          icon: 'icon-puzzle',
        },
        {
          name: 'Create Events',
          url: '/actions/createEvent',
          icon: 'icon-puzzle',
        }
      ],
    },
    {
      name: 'Emails',
      url: '',
      icon: 'icon-puzzle',
      children: [
        {
          name: 'Send Reminders',
          url: '/reminder',
          icon: 'icon-puzzle',
        },
        {
          name: 'Send Reports',
          url: '/actions/createEvent',
          icon: 'icon-puzzle',
        }
      ],
    },
    {
      title: 'Views',
      name: 'Views',
      wrapper: {            // optional wrapper object
        element: '',        // required valid HTML5 element tag
        attributes: {}        // optional valid JS object with JS API naming ex: { className: "my-class", style: { fontFamily: "Verdana" }, id: "my-id"}
      },
      class: ''             // optional class names space delimited list for title item ex: "text-center"
    }
    ,
    {
      name: 'Feedbacks',
      url: '/viewFeedback',
      icon: 'icon-cursor',
      children: [
        {
          name: 'Feedback by BUs',
          url: '/viewFeedback/bu',
          icon: 'icon-cursor'
        },
        {
          name: 'Feedback by City',
          url: '/viewFeedback/city',
          icon: 'icon-cursor'
        },
        {
          name: 'Feedback by Country',
          url: '/viewFeedback/country',
          icon: 'icon-cursor'
        }
        
      ]
    }]
};

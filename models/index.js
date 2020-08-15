const Sequelize = require('sequelize')
//I needed to update this string to allow connnection.
const db = new Sequelize('postgres://localhost:5432/wikistack', {
    logging: false
})

db.authenticate()
  .then(() => {
    console.log('connected to the database');
  })

function generateSlug(title) {
  // Removes all non-alphanumeric characters from title
  // And make whitespace underscore
  return title.replace(/\s+/g, '_').replace(/\W/g, '');   
}

const Page = db.define('page', {
    title: {
        type: Sequelize.DataTypes.STRING ,
        allowNull: false
    },
    slug: {
        type: Sequelize.STRING,
        allowNull: false
    },
    content: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    status: {
        type: Sequelize.ENUM('open', 'closed')
    }
})

//given a page, if there is no slug 
Page.beforeValidate((page)=> {
    if(!page.slug) {
        page.slug = generateSlug(page.title)
    }
})

const User = db.define('user', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            isEmail: true
        }
    }
})
//HasOne inserts the association key in target model 
//whereas BelongsTo inserts the association key in the source model.
//-------------
//establishing a relationship between the tables (1 to many)
//source.belongsTo(target)-----> the foreign key is added on the source
//referencing the user table as author aliasing
Page.belongsTo(User, {as: 'author'}) 

//this will link the two pages on the foreign key author id
//foreignKey will allow you to set source model key in the through relation.
User.hasMany(Page, {foreignKey: 'authorId'}) 

module.exports = {
    db, Page, User
}

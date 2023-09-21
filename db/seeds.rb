# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)


# db/seeds.rb

ApplicationRecord.transaction do 
  puts "Destroying tables..."
  # Unnecessary if using `rails db:seed:replant`
  User.destroy_all
  Product.destroy_all

# ActiveRecord::Base.connection.reset_pk_sequence!('users')
# ActiveRecord::Base.connection.reset_pk_sequence!('products')


  puts "Resetting primary keys..."
  # For easy testing, so that after seeding, the first `User` has `id` of 1
  ApplicationRecord.connection.reset_pk_sequence!('users')

  puts "Creating users..."
  # Create one user with an easy to remember username, email, and password:
  User.create!(
    full_name: 'Demo User', 
    email: 'demo@user.io', 
    password: 'password'
  )

  # More users
  10.times do 
    User.create!({
      full_name: Faker::Name.name,
      email: Faker::Internet.unique.email,
      password: 'password'
    }) 
  end

  puts "Creating products..."

  product1 = Product.create!(
    name: "Pedigree Complete Nutrition Grilled Steak & Vegetable Flavor Dog Kibble Adult Dry Dog Food",
    category: "Dog Food",
    price: 29.98,
    rating: 4.2,
    details: "Complete and balanced nutrition has antioxidants, vitamins and minerals to help maintain a healthy lifestyle.
              Optimal levels of omega-6 fatty acid nourish the skin and help keep his coat shiny and healthy.
              Whole grains and a special fiber blend support healthy digestion with a delicious grilled steak flavor.
              Unique, crunchy texture helps to clean the teeth with every bite to support good oral health between brushings.",
    flavor_options: ["Grilled Steak", "Roast Chicken"],
    size_options: ["3.5-lb bag", "18-lb bag", "30-lb bag"]
  )

  product2 = Product.create!(
    name: "Blue Buffalo Life Protection Formula Adult Chicken & Brown Rice Recipe Dry Dog Food",
    category: "Dog Food",
    price: 64.99,
    rating: 4.1,
    details: "Essential, high-quality protein for healthy muscle development, and carbs for energy for an active life.
              Calcium, phosphorus and essential vitamins for strong bones and teeth.
              Glucosamine is added for joint health and mobility support.
              Vitamins, chelated minerals and antioxidants contribute to your pup's immune system health.
              No corn, wheat, soy or chicken (or poultry) by-product meals.",
    flavor_options: ["Beef & Brown Rice", "Chicken & Brown Rice", "Lamb & Brown Rice"],
    size_options: ["5-lb bag", "15-lb bag", "24-lb bag"]
    )


  puts "Done!"
end
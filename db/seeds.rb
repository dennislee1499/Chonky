# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)


# db/seeds.rb

require "open-uri"

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

end

puts "Creating products..."

  product1 = Product.create!(
    name: "Pedigree Complete Nutrition Grilled Steak & Vegetable Flavor Dog Kibble Adult Dry Dog Food",
    category: "Dog Food",
    price: 29.98,
    rating: 4,
    details: "Complete and balanced nutrition has antioxidants, vitamins and minerals to help maintain a healthy lifestyle.
              Optimal levels of omega-6 fatty acid nourish the skin and help keep his coat shiny and healthy.
              Whole grains and a special fiber blend support healthy digestion with a delicious grilled steak flavor.
              Unique, crunchy texture helps to clean the teeth with every bite to support good oral health between brushings.",
    flavor_options: ["Grilled Steak", "Roast Chicken"],
    size_options: ["3.5-lb bag", "18-lb bag", "30-lb bag"]
  )

  product1.image.attach(io: URI.open("https://chonky-seeds.s3.amazonaws.com/pedigree.png"), filename: "pedigree.png")


  product2 = Product.create!(
    name: "Blue Buffalo Life Protection Formula Adult Chicken & Brown Rice Recipe Dry Dog Food",
    category: "Dog Food",
    price: 25.66,
    rating: 4,
    details: "Essential, high-quality protein for healthy muscle development, and carbs for energy for an active life.
              Calcium, phosphorus and essential vitamins for strong bones and teeth.
              Glucosamine is added for joint health and mobility support.
              Vitamins, chelated minerals and antioxidants contribute to your pup's immune system health.
              No corn, wheat, soy or chicken (or poultry) by-product meals.",
    flavor_options: ["Beef & Brown Rice", "Chicken & Brown Rice", "Lamb & Brown Rice"],
    size_options: ["5-lb bag", "15-lb bag", "24-lb bag"]
    )

    product2.image.attach(io: URI.open("https://chonky-seeds.s3.amazonaws.com/blueBuffalo.png"), filename: "blueBuffalo.png")


    product3 = Product.create!(
    name: "Purina Pro Plan Adult Shredded Blend Beef & Rice Formula Dry Dog Food",
    category: "Dog Food",
    price: 19.88,
    rating: 3,
    details: "High-protein, wholesome recipe features real beef as the very first ingredient.
              Formulated to be the paw-fect balance between nutritious and delicious.
              Crafted into a hard kibble with tender shredded bites to create a tasty texture.
              Contains vitamin A and omega-6 fatty acids to nourish your dog’s skin and coat.
              Fortified with live probiotics and natural prebiotic fiber to support digestive and immune health.",
    flavor_options: ["Beef & Rice", "Salmon & Rice", "Turkey & Rice"],
    size_options: ["6-lb bag", "17-lb bag", "33-lb bag"]
    )


    product3.image.attach(io: URI.open("https://chonky-seeds.s3.amazonaws.com/purina.png"), filename: "purina.png")


    product4 = Product.create!(
    name: "Iams Proactive Health MiniChunks Small Kibble Adult Chicken & Whole Grain Dry Dog Food",
    category: "Dog Food",
    price: 14.98,
    rating: 5,
    details: "This nutritious dog food features real lamb as the first ingredient.
              The small kibble size is great for adult dogs of all sizes.
              Natural fiber and prebiotics promote healthy digestion.
              Nutrients and antioxidants support overall health.
              100% complete and balanced nutrition with zero fillers for adult dogs.",
    flavor_options: ["Chicken & Whole Grains", "Lamb & Rice"],
    size_options: ["3.3-lb bag", "7-lb bag", "15-lb bag"]
    )

    product4.image.attach(io: URI.open("https://chonky-seeds.s3.amazonaws.com/iams.png"), filename: "iams.png")


    product5 = Product.create!(
    name: "Fancy Feast Gourmet Filet Mignon Flavor with Real Seafood & Shrimp Dry Cat Food",
    category: "Cat Food",
    price: 10.18,
    rating: 4,
    details: "Premium dry cat food delivers 100 percent complete and balanced nutrition and is 100 percent made to delight even the pickiest eaters.
              Crafted with high quality Purina dry cat food ingredients, including real seafood and shrimp with an irresistible filet mignon flavor.
              Provides essential vitamins for cats, plus minerals to help support feline health.
              Gourmet recipe including seafood and shrimp for cats and filet mignon flavor baked into wonderfully crisp morsels for a crunchy texture that cats love.
              Fancy Feast dry food produced using sustainable ingredients in Purina-owned facilities.",
    flavor_options: ["Ocean Fish & Salmon", "Savory Chicken & Turkey"],
    size_options: ["3-lb bag", "6.5-lb bag", "12-lb bag"]
    )

    product5.image.attach(io: URI.open("https://chonky-seeds.s3.amazonaws.com/fancyfeast.png"), filename: "fancyfeast.png")


    product6 = Product.create!(
    name: "Friskies Surfin' & Turfin' Favorites Dry Cat Food",
    category: "Cat Food",
    price: 5.29,
    rating: 2,
    details: "Packed with protein to support lean muscles and the surf and turf flavor cats crave in every crunchy bite.
              Made with chicken, ocean whitefish, salmon and filet mignon for a land-and-sea feast in every bowl.
              Loaded with antioxidants to support a healthy immune system plus essential vitamins and minerals for overall well-being.
              Appealing shapes keep her occupied and the crunchy texture helps clean her teeth!
              100% complete and balanced for all stages.",
    flavor_options: ["Chicken", "Filet Mignon"],
    size_options: ["3.15-lb bag", "22-lb bag"]
    )

    product6.image.attach(io: URI.open("https://chonky-seeds.s3.amazonaws.com/friskies.png"), filename: "friskies.png")


    product7 = Product.create!(
    name: "Meow Mix Original Choice Dry Cat Food",
    category: "Cat Food",
    price: 9.19,
    rating: 1,
    details: "Premium protein for strong muscles
              Provides all the essential vitamins and minerals your cat needs
              Chicken, turkey, salmon and ocean fish flavors are sure to be an instant hit
              100% complete and balanced nutritious diet for adult cats
              Made right here in the USA",
    flavor_options: ["Original Choice", "Seafood Medley"],
    size_options: ["6.3-lb bag", "14.2-lb bag", "16-lb bag"]
    )

    product7.image.attach(io: URI.open("https://chonky-seeds.s3.amazonaws.com/meowmix.png"), filename: "meowmix.png")


    product8 = Product.create!(
    name: "Rachael Ray Nutrish Indoor Complete Chicken with Lentils & Salmon Recipe Natural Dry Cat Food",
    category: "Cat Food",
    price: 10.18,
    rating: 3,
    details: "Real chicken is the #1 ingredient.
              This natural cat food helps support your kitty’s indoor lifestyle.
              Rich in fiber to support healthy weight.
              Helps support skin and coat health with omega-6 fatty acids.
              Helps support immunity with vitamin E and antioxidants.",
    flavor_options: ["Chicken", "Salmon"],
    size_options: ["3-lb bag", "6-lb bag", "14-lb bag"]
    )

    product8.image.attach(io: URI.open("https://chonky-seeds.s3.amazonaws.com/rachaelray.png"), filename: "rachaelray.png")


    product9 = Product.create!(
    name: "Nylabone Puppy Teethe n' Tug Toy Blue, X-Small",
    category: "Dog Toys",
    price: 8.31,
    rating: 4,
    details: "Non-edible chew toy keeps puppies busy and happy, which helps to reduce destructive chewing.
              Rounded design allows you to play tug-of-war with your pup, which helps burn energy and promote bonding.
              Satisfies their natural urge to chew, and is recommended by veterinarians.
              Ridged texture is perfect for teething puppies, and is easily cleaned with warm, soapy water.
              Different dogs have different chewing styles and strengths, and this toy is designed for puppies that are gentle chewers.",
    )

    product9.image.attach(io: URI.open("https://chonky-seeds.s3.amazonaws.com/nylabone.png"), filename: "nylabone.png")


    product10 = Product.create!(
    name: "KONG Floppy Knots Dog Toy, Fox",
    category: "Dog Toys",
    price: 9.99,
    rating: 5,
    details: "Dog toy made with internal knotted rope and squeaker to satisfy the natural instincts to chew and the need for noise stimulation.
              Floppy design allows for hours of thrashing fun and entices your pup to play and chase.
              Internal squeaker makes this the perfect toy for games of fetch and for solo play while you're away.
              Minimal stuffing means less mess, so you and your furry friend can spend more time playing.",
    size_options: ["Small/Medium", "Medium/Large"]
    )

    product10.image.attach(io: URI.open("https://chonky-seeds.s3.amazonaws.com/fox.png"), filename: "fox.png")


    product11 = Product.create!(
    name: "Frisco Monkey Plush with Rope Squeaky Dog Toy, Medium/Large",
    category: "Dog Toys",
    price: 12.74,
    rating: 4,
    details: "The ultra-soft plush fabric makes it cuddly enough for snuggling up to for naps, too.
              Minimal stuffing means less worrying about stuffing messes during supervised play.
              Great way to add in daily play to bond with your dog and help keep him active and healthy.",
    )

    product11.image.attach(io: URI.open("https://chonky-seeds.s3.amazonaws.com/monkey.png"), filename: "monkey.png")


    product12 = Product.create!(
    name: "Chuckit! Ultra Duo Tug Tough Dog Toy",
    category: "Dog Toys",
    price: 7.51,
    rating: 4,
    details: "Duo tug fetch toy takes your next outdoor play time to the next level and is launcher compatible.
              Features two tennis balls connected by a durable, two-ply nylon handle that makes it easy to toss.
              The interactive design is developed to have high bounce, high buoyancy, and extreme durability. Perfect for countless hours of playtime!
              Bright colors offer high visibility, making it easy to locate during nighttime play or when you throw it extra far.
              The flexible rubber edges are gentle to your dog’s mouth, making it safe to go for the most extreme catches.",
    size_options: ["Small", "Medium"]
    )

    product12.image.attach(io: URI.open("https://chonky-seeds.s3.amazonaws.com/chuckit.png"), filename: "chuckit.png")

  puts "Done!"
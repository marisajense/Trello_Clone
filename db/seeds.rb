user = User.create(email: Faker::Internet.email, password: 'password')
5.times do
  board = user.boards.create(name: Faker::Beer.name)
  3.times do
    board.lists.create(title: Faker::Beer.style)
  end
end

puts "#{user.email} was seeded with boards!"

/*
# Seed Data for Pet Shop Eli

1. Categories
- Dog categories: Food, Toys, Beds, Accessories
- Cat categories: Food, Toys, Beds, Litter & Supplies

2. Products
- 12+ products across categories with realistic pricing
- Mix of featured and best-seller items
- High-quality stock images from Pexels

3. Reviews
- Sample reviews to populate the homepage
*/

-- Insert categories
INSERT INTO categories (name, slug, description, image_url, pet_type, display_order) VALUES
-- Dog categories
('Dog Food', 'dog-food', 'Premium nutrition for your furry best friend', 'https://images.pexels.com/photos/1629785/pexels-photo-1629785.jpeg?auto=compress&cs=tinysrgb&w=600', 'dog', 1),
('Dog Toys', 'dog-toys', 'Playtime essentials for endless fun', 'https://images.pexels.com/photos/5519119/pexels-photo-5519119.jpeg?auto=compress&cs=tinysrgb&w=600', 'dog', 2),
('Dog Beds', 'dog-beds', 'Cozy comfort for sweet dreams', 'https://images.pexels.com/photos/5519119/pexels-photo-5519119.jpeg?auto=compress&cs=tinysrgb&w=600', 'dog', 3),
('Dog Accessories', 'dog-accessories', 'Collars, leashes, and more', 'https://images.pexels.com/photos/1490844/pexels-photo-1490844.jpeg?auto=compress&cs=tinysrgb&w=600', 'dog', 4),
-- Cat categories
('Cat Food', 'cat-food', 'Delicious and nutritious meals for your cat', 'https://images.pexels.com/photos/4162455/pexels-photo-4162455.jpeg?auto=compress&cs=tinysrgb&w=600', 'cat', 5),
('Cat Toys', 'cat-toys', 'Keep your cat entertained for hours', 'https://images.pexels.com/photos/1270275/pexels-photo-1270275.jpeg?auto=compress&cs=tinysrgb&w=600', 'cat', 6),
('Cat Beds', 'cat-beds', 'Luxurious sleeping spots for cats', 'https://images.pexels.com/photos/62640/pexels-photo-62640.jpeg?auto=compress&cs=tinysrgb&w=600', 'cat', 7),
('Cat Litter & Supplies', 'cat-litter-supplies', 'Everything for a clean and happy cat', 'https://images.pexels.com/photos/3335279/pexels-photo-3335279.jpeg?auto=compress&cs=tinysrgb&w=600', 'cat', 8)
ON CONFLICT (slug) DO NOTHING;

-- Insert products
INSERT INTO products (name, slug, description, short_description, price, compare_at_price, image_url, images, category_id, pet_type, stock, sku, featured, best_seller, rating, reviews_count) VALUES
-- Dog products
('Premium Grain-Free Dog Food', 'premium-grain-free-dog-food', 'A wholesome, grain-free formula packed with real chicken, vegetables, and essential nutrients. Perfect for dogs of all breeds and sizes. This premium formula supports healthy skin, a shiny coat, and strong muscles.', 'Premium grain-free nutrition with real chicken', 54.99, 64.99, 'https://images.pexels.com/photos/2253275/pexels-photo-2253275.jpeg?auto=compress&cs=tinysrgb&w=600', ARRAY['https://images.pexels.com/photos/2253275/pexels-photo-2253275.jpeg?auto=compress&cs=tinysrgb&w=600'], (SELECT id FROM categories WHERE slug = 'dog-food'), 'dog', 150, 'DOG-FOOD-001', true, true, 4.8, 124),

('Interactive Squeaky Ball Toy Set', 'interactive-squeaky-ball-toy-set', 'Keep your pup entertained for hours with this colorful set of 6 durable squeaky balls. Made from non-toxic materials, perfect for fetch and chewing. Great for outdoor play and training sessions.', '6 durable squeaky balls for endless fun', 18.99, null, 'https://images.pexels.com/photos/5519119/pexels-photo-5519119.jpeg?auto=compress&cs=tinysrgb&w=600', ARRAY['https://images.pexels.com/photos/5519119/pexels-photo-5519119.jpeg?auto=compress&cs=tinysrgb&w=600'], (SELECT id FROM categories WHERE slug = 'dog-toys'), 'dog', 200, 'DOG-TOY-001', true, false, 4.6, 89),

('Orthopedic Memory Foam Dog Bed', 'orthopedic-memory-foam-dog-bed', 'Give your dog the gift of better sleep with this luxurious orthopedic memory foam bed. Features a removable, washable cover and non-slip bottom. Perfect for senior dogs or those with joint issues.', 'Luxurious orthopedic support for better sleep', 89.99, 119.99, 'https://images.pexels.com/photos/4587995/pexels-photo-4587995.jpeg?auto=compress&cs=tinysrgb&w=600', ARRAY['https://images.pexels.com/photos/4587995/pexels-photo-4587995.jpeg?auto=compress&cs=tinysrgb&w=600'], (SELECT id FROM categories WHERE slug = 'dog-beds'), 'dog', 50, 'DOG-BED-001', true, true, 4.9, 203),

('Reflective Dog Collar & Leash Set', 'reflective-dog-collar-leash-set', 'Stay safe during evening walks with this stylish reflective collar and leash set. Made from durable nylon with sturdy metal buckles. Available in multiple sizes and colors.', 'Safe and stylish reflective walking set', 29.99, null, 'https://images.pexels.com/photos/1490844/pexels-photo-1490844.jpeg?auto=compress&cs=tinysrgb&w=600', ARRAY['https://images.pexels.com/photos/1490844/pexels-photo-1490844.jpeg?auto=compress&cs=tinysrgb&w=600'], (SELECT id FROM categories WHERE slug = 'dog-accessories'), 'dog', 300, 'DOG-ACC-001', false, true, 4.7, 156),

('Natural Dog Treats Variety Pack', 'natural-dog-treats-variety-pack', 'Reward your pup with these delicious, all-natural treats. Made in USA with real meat and no artificial preservatives. Includes 5 different flavors for variety.', 'All-natural treats made with real meat', 24.99, 32.99, 'https://images.pexels.com/photos/3335279/pexels-photo-3335279.jpeg?auto=compress&cs=tinysrgb&w=600', ARRAY['https://images.pexels.com/photos/3335279/pexels-photo-3335279.jpeg?auto=compress&cs=tinysrgb&w=600'], (SELECT id FROM categories WHERE slug = 'dog-food'), 'dog', 180, 'DOG-TREAT-001', false, true, 4.8, 178),

('Rope Tug Toy Bundle', 'rope-tug-toy-bundle', 'A colorful 3-pack of durable rope toys perfect for tug-of-war and chewing. Helps clean teeth while playing. Made from natural cotton fibers.', 'Durable rope toys for tug-of-war', 15.99, null, 'https://images.pexels.com/photos/7385129/pexels-photo-7385129.jpeg?auto=compress&cs=tinysrgb&w=600', ARRAY['https://images.pexels.com/photos/7385129/pexels-photo-7385129.jpeg?auto=compress&cs=tinysrgb&w=600'], (SELECT id FROM categories WHERE slug = 'dog-toys'), 'dog', 250, 'DOG-TOY-002', false, false, 4.5, 67),

-- Cat products
('Gourmet Cat Food Selection', 'gourmet-cat-food-selection', 'A premium wet food selection your cat will love. Made with real salmon, chicken, and tuna in a savory gravy. High protein, grain-free formula.', 'Premium wet food with real seafood', 42.99, 49.99, 'https://images.pexels.com/photos/4162455/pexels-photo-4162455.jpeg?auto=compress&cs=tinysrgb&w=600', ARRAY['https://images.pexels.com/photos/4162455/pexels-photo-4162455.jpeg?auto=compress&cs=tinysrgb&w=600'], (SELECT id FROM categories WHERE slug = 'cat-food'), 'cat', 120, 'CAT-FOOD-001', true, true, 4.9, 189),

('Catnip Filled Plush Mouse Toys', 'catnip-filled-plush-mouse-toys', 'These adorable plush mice are filled with premium catnip for hours of playful entertainment. Set of 6 in assorted colors. Cats go crazy for them!', 'Irresistible catnip-filled toys', 12.99, null, 'https://images.pexels.com/photos/1270275/pexels-photo-1270275.jpeg?auto=compress&cs=tinysrgb&w=600', ARRAY['https://images.pexels.com/photos/1270275/pexels-photo-1270275.jpeg?auto=compress&cs=tinysrgb&w=600'], (SELECT id FROM categories WHERE slug = 'cat-toys'), 'cat', 400, 'CAT-TOY-001', true, false, 4.7, 145),

('Luxury Cat Tower & Scratcher', 'luxury-cat-tower-scratcher', 'A multi-level cat tower with scratching posts, perches, and a cozy hideaway. Made from durable materials with a stylish neutral design that fits any home.', 'Multi-level play and rest station', 149.99, 189.99, 'https://images.pexels.com/photos/1622628/pexels-photo-1622628.jpeg?auto=compress&cs=tinysrgb&w=600', ARRAY['https://images.pexels.com/photos/1622628/pexels-photo-1622628.jpeg?auto=compress&cs=tinysrgb&w=600'], (SELECT id FROM categories WHERE slug = 'cat-beds'), 'cat', 30, 'CAT-BED-001', true, true, 4.8, 234),

('Self-Cleaning Litter Box', 'self-cleaning-litter-box', 'Say goodbye to daily scooping with this automatic self-cleaning litter box. Features odor control, quiet operation, and easy waste disposal. Works with any clumping litter.', 'Automatic self-cleaning technology', 199.99, 249.99, 'https://images.pexels.com/photos/3335279/pexels-photo-3335279.jpeg?auto=compress&cs=tinysrgb&w=600', ARRAY['https://images.pexels.com/photos/3335279/pexels-photo-3335279.jpeg?auto=compress&cs=tinysrgb&w=600'], (SELECT id FROM categories WHERE slug = 'cat-litter-supplies'), 'cat', 40, 'CAT-LIT-001', true, true, 4.6, 98),

('Cozy Heated Cat Bed', 'cozy-heated-cat-bed', 'Keep your cat warm and comfortable with this soft heated bed. Features adjustable temperature, machine-washable cover, and auto-shutoff for safety.', 'Warm comfort with adjustable heat', 59.99, null, 'https://images.pexels.com/photos/62640/pexels-photo-62640.jpeg?auto=compress&cs=tinysrgb&w=600', ARRAY['https://images.pexels.com/photos/62640/pexels-photo-62640.jpeg?auto=compress&cs=tinysrgb&w=600'], (SELECT id FROM categories WHERE slug = 'cat-beds'), 'cat', 75, 'CAT-BED-002', false, false, 4.7, 112),

('Interactive Feather Wand Toy', 'interactive-feather-wand-toy', 'Engage your cat in active play with this interactive feather wand. Features colorful feathers and a flexible wand for exciting hunting games.', 'Engaging feather wand for active play', 9.99, null, 'https://images.pexels.com/photos/1405224/pexels-photo-1405224.jpeg?auto=compress&cs=tinysrgb&w=600', ARRAY['https://images.pexels.com/photos/1405224/pexels-photo-1405224.jpeg?auto=compress&cs=tinysrgb&w=600'], (SELECT id FROM categories WHERE slug = 'cat-toys'), 'cat', 500, 'CAT-TOY-002', false, true, 4.8, 87)
ON CONFLICT (slug) DO NOTHING;

-- Insert reviews
INSERT INTO reviews (product_id, author_name, rating, title, content, verified_purchase) VALUES
-- Dog product reviews
((SELECT id FROM products WHERE slug = 'premium-grain-free-dog-food'), 'Sarah M.', 5, 'My dog loves this food!', 'My golden retriever has been eating this for 3 months now and her coat has never looked better. She gets excited at mealtime and has more energy. Highly recommend!', true),
((SELECT id FROM products WHERE slug = 'premium-grain-free-dog-food'), 'Mike T.', 4, 'Great quality, slightly pricey', 'Transitioning my dog to this food was smooth. The quality is evident but I wish it came in larger bags for better value.', true),
((SELECT id FROM products WHERE slug = 'orthopedic-memory-foam-dog-bed'), 'Jennifer L.', 5, 'Worth every penny', 'My 12-year-old lab has arthritis and this bed has made such a difference. She sleeps through the night now and seems much more comfortable.', true),
((SELECT id FROM products WHERE slug = 'orthopedic-memory-foam-dog-bed'), 'David R.', 5, 'Perfect for older dogs', 'Bought this for my senior poodle and she absolutely loves it. The memory foam is high quality and the cover washes well.', true),
((SELECT id FROM products WHERE slug = 'interactive-squeaky-ball-toy-set'), 'Emma W.', 4, 'Hours of entertainment', 'My puppy loves these balls! Only giving 4 stars because one ball popped after a week of heavy chewing, but the others are still going strong.', true),
((SELECT id FROM products WHERE slug = 'reflective-dog-collar-leash-set'), 'Chris P.', 5, 'Great for night walks', 'The reflective material works amazingly well. I feel so much safer walking my dog in the evening now. Good quality and looks great too!', true),

-- Cat product reviews
((SELECT id FROM products WHERE slug = 'gourmet-cat-food-selection'), 'Amanda H.', 5, 'Picky eater approved!', 'My cat is extremely picky but she devours this food. The variety pack is great and the quality is excellent. Will definitely keep buying.', true),
((SELECT id FROM products WHERE slug = 'gourmet-cat-food-selection'), 'Tom K.', 4, 'Good food, my cats love it', 'Both of my cats enjoy this food. The only downside is the price, but the quality justifies it.', true),
((SELECT id FROM products WHERE slug = 'luxury-cat-tower-scratcher'), 'Rachel B.', 5, 'Cats new favorite spot', 'This cat tower is amazing! My three cats are always fighting over who gets to sit on the top perch. Very sturdy and easy to assemble.', true),
((SELECT id FROM products WHERE slug = 'luxury-cat-tower-scratcher'), 'James C.', 5, 'Best purchase ever', 'Worth every penny. My cats use it all day long. The scratching posts have saved my furniture!', true),
((SELECT id FROM products WHERE slug = 'catnip-filled-plush-mouse-toys'), 'Lisa N.', 5, 'Cat goes crazy for these', 'As soon as I opened the package, my cat was all over these mice. Great quality and the catnip is potent. Buying more!', true),
((SELECT id FROM products WHERE slug = 'self-cleaning-litter-box'), 'Karen S.', 4, 'Life changing!', 'I can''t believe I waited so long to get this. No more daily scooping! Took my cat a few days to adjust but now she uses it fine. Only 4 stars because it''s a bit loud.', true)
ON CONFLICT DO NOTHING;
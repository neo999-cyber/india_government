"""
The term lists the classifier matches on, and the reasoning behind each one.

WHY THESE ARE IN THEIR OWN MODULE
    They are the part most likely to need editing after the first real run, and the part whose
    contents a reader must be able to audit without reading control flow. Every classification
    decision reports which terms it matched, so a wrong bucket is traced to a term here rather
    than guessed at.

MATCHING IS WORD-BOUNDARY BY DEFAULT
    Substring matching over bios produces false positives at a rate that makes the output
    useless — "eat" inside "theatre", "ad" inside "salad". Multi-word terms are matched as
    phrases. Where a substring match is genuinely wanted it is written as an explicit regex in
    `REGEX_TERMS` so it is visible rather than implied.

WHAT THE LISTS ARE NOT
    They are not the decision. A term match is a signal; `classify.py` combines signals into a
    bucket, and the ambiguous middle goes to a review list rather than being resolved by adding
    more terms. Tuning lexicons until every account lands cleanly is how a classifier gets
    quietly overfitted to the accounts you happened to look at.
"""

# --- food ---------------------------------------------------------------
# Broad on purpose. A false positive here costs one row in a review list; a false negative
# costs a missed influencer, which is the failure mode step 1 exists to eliminate.
FOOD_TERMS = {
    # identity
    "food", "foods", "foodie", "foodies", "foodblogger", "food blogger", "foodblog",
    "food blog", "food writer", "food guide", "foodguide", "food critic", "food lover",
    "foodstagram", "foodgram", "gastronome", "gastronomy", "gastronomic", "epicure",
    # the act
    "eat", "eats", "eating", "dine", "dining", "brunch", "brunching", "tasting", "tastings",
    "hungry", "cravings", "feast", "bites", "munch", "nom",
    # the place
    "restaurant", "restaurants", "cafe", "café", "cafes", "eatery", "eateries", "bistro",
    "diner", "bakery", "patisserie", "steakhouse", "buffet", "rooftop bar", "speakeasy",
    # the thing
    "cuisine", "culinary", "chef", "kitchen", "menu", "dish", "dishes", "dessert", "desserts",
    "coffee", "brunch spots", "street food", "seafood", "sushi", "ramen", "burger", "burgers",
    "shawarma", "biryani", "pizza", "steak", "bbq", "barbecue", "breakfast", "flavours",
    "flavors", "delicious", "yummy", "tasty", "halal",
    # the review vocabulary
    "hidden gems", "must try", "must-try", "where to eat", "food spots", "best spots",
    "new openings", "restaurant review", "food review", "food reviews",
}

# --- UAE geography ------------------------------------------------------
# Emirates, then Dubai districts specific enough to be unambiguous. "downtown" and "marina"
# alone are omitted deliberately: they name districts in dozens of cities.
UAE_TERMS = {
    "uae", "u.a.e", "united arab emirates", "emirates", "emirati",
    "dubai", "abu dhabi", "abudhabi", "sharjah", "ajman", "fujairah",
    "ras al khaimah", "umm al quwain", "dxb", "auh",
    "jumeirah", "palm jumeirah", "deira", "bur dubai", "al barsha", "al quoz", "al qusais",
    "business bay", "downtown dubai", "dubai marina", "dubai hills", "city walk",
    "festival city", "mall of the emirates", "dubai mall", "mirdif", "karama", "satwa",
    "media city", "internet city", "silicon oasis", "motor city", "jlt", "jbr", "difc",
}

# The UAE flag emoji, matched literally — the single most common geo marker in a Dubai bio and
# invisible to word-boundary matching.
UAE_EMOJI = "\U0001F1E6\U0001F1EA"

# --- geography that disqualifies ---------------------------------------
# Only consulted when NO UAE term matched. A bio reading "Indian food in Dubai" must not be
# thrown out by "india", and the classifier's ordering is what guarantees that.
OTHER_GEO_TERMS = {
    # India — the largest source of confusion in this particular following list
    "india", "delhi", "new delhi", "mumbai", "bombay", "bengaluru", "bangalore", "chennai",
    "hyderabad", "pune", "kolkata", "kerala", "kochi", "cochin", "goa", "jaipur", "ahmedabad",
    "lucknow", "chandigarh", "indore", "surat", "nagpur", "thrissur", "calicut", "kozhikode",
    # elsewhere in the Gulf — food accounts, wrong city
    "riyadh", "jeddah", "saudi", "ksa", "doha", "qatar", "kuwait", "bahrain", "manama",
    "oman", "muscat",
    # rest of world
    "london", "manchester", "birmingham", "united kingdom", "england", "scotland",
    "new york", "nyc", "brooklyn", "los angeles", "san francisco", "chicago", "boston",
    "massachusetts", "california", "texas", "florida", "seattle", "toronto", "vancouver",
    "paris", "berlin", "milan", "rome", "madrid", "barcelona", "amsterdam", "lisbon",
    "singapore", "malaysia", "kuala lumpur", "bangkok", "jakarta", "manila", "hong kong",
    "tokyo", "seoul", "sydney", "melbourne", "auckland", "karachi", "lahore", "islamabad",
    "pakistan", "dhaka", "bangladesh", "colombo", "sri lanka", "cairo", "egypt", "istanbul",
    "nairobi", "lagos", "johannesburg", "cape town",
}

# --- recipe / nutrition / food-science ---------------------------------
# Food-adjacent but not place-recommending. The handoff names this exclusion explicitly:
# these accounts teach you to cook or to eat well, they do not tell you where to go.
RECIPE_TERMS = {
    "recipe", "recipes", "cookbook", "cook book", "home cook", "homecook", "home cooking",
    "homecooking", "meal prep", "mealprep", "meal plan", "food science", "food scientist",
    "nutritionist", "nutrition", "dietitian", "dietician", "diet plan", "weight loss",
    "fat loss", "calories", "macros", "baking tips", "cooking tips", "easy recipes",
    "what i eat in a day",
}

# --- venue signals ------------------------------------------------------
# A venue account is a good source of address and hours and CANNOT endorse anything. The
# handoff is firm that `influencers` and `places` stay separate tables, so the split has to
# happen at ingestion rather than being cleaned up later.
VENUE_TERMS = {
    "book now", "booking", "bookings", "reservation", "reservations", "reserve now",
    "order now", "order online", "we deliver", "delivery available", "dine in", "dine-in",
    "takeaway", "take away", "walk ins", "walk-ins", "open daily", "open everyday",
    "opening hours", "our branches", "new branch", "outlet", "outlets", "franchise",
    "now open", "visit us", "find us at", "our menu", "call us", "whatsapp us",
    "catering", "private dining", "events & catering",
}

# Instagram's own `category_name` for venues. The handoff calls this field a free classifier
# and it is — it is the single most reliable venue signal available, so it is treated as
# decisive rather than as one vote among many.
VENUE_CATEGORY_EXACT = {
    "restaurant", "cafe", "café", "coffee shop", "bakery", "bar", "pub", "lounge",
    "fast food restaurant", "pizza place", "sushi restaurant", "seafood restaurant",
    "barbecue restaurant", "breakfast & brunch restaurant", "burger restaurant",
    "dessert shop", "ice cream shop", "juice bar", "tea room", "food truck", "caterer",
    "grocery store", "supermarket", "deli", "diner", "steakhouse", "food & beverage",
    "food & beverage company", "hotel", "resort", "bar & grill", "wine bar", "brewery",
    "shopping mall", "nightclub",
}

# Substrings that make a category a venue whatever the exact wording — Instagram emits a long
# tail of "<cuisine> restaurant" values that no exact list will ever finish enumerating.
VENUE_CATEGORY_SUBSTRINGS = (
    "restaurant", "cafe", "café", "coffee", "bakery", "bar & ", "steakhouse", "food truck",
    "dessert shop", "ice cream", "juice bar", "grocery", "supermarket", "hotel", "resort",
    "catering", "caterer", "pizzeria", "brewery", "winery", "nightclub", "shopping mall",
)

# Categories that mark a creator rather than a venue. Used to STOP a venue-term match from
# reclassifying an influencer who happens to write "book now" in a collaboration post.
CREATOR_CATEGORY_EXACT = {
    "blogger", "digital creator", "video creator", "reel creator", "content creator",
    "influencer", "public figure", "journalist", "writer", "author", "photographer",
    "personal blog", "entrepreneur", "artist", "musician/band", "podcast",
}

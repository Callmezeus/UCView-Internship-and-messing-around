Parameters:

category=popular|upcoming|fresh|editors|custom
when category set to custom
{
q=search_term
sort=sort_terms_as_listed_in_search_page
categories=500px_categories_as_listed_in_search_page
}
interval=interval_in_seconds_not_less_than_5

| -> means (or) 

Example:
index.html?category=popular&interval=7
index.html?category=custom&interval=7&q=brooklyn&categories=City & Architecture

Responsive, scales based on window size

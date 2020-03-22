Searct Artists View
===================
## on init
- table column: exhibition count
- on first page
- pages count is a number
- table rows: link must have an id

## actions
- search for "zalav": results 4 items
- search: "oooo": 0 item
- on search "zala": 3 pages

- paginate next, prev changes results
- on keyword changed go to first page

Search Exhibitions View
=======================
## on init
- exhibitions has an id
- galleries has an id
- opening, closing dates are valid dates
- paginate: pages count is a number

## actions
- search for 'inverz': 3 items
- search for 'oooops': no items

- search for 'under': result two pages
- paginate next, prev changes results
- on keyword changed go to first page

Search Galleries View
=====================
- seearch for 'kis', results 5 rows
- search for 'oooops': no items

- search for 'a' results 24 pages
- paginate next, prev changes results
- on keyword change go to first page


# artist, exhibition, gallery detail views
- update on route change (new id)
- links to exhibitions/galleries/artists has ids

# Exhibitions View
- ikon link has valid id
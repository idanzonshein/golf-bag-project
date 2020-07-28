bag = Bag.create(
  id: 1,
  name: "Idan",
  color: "Black",
)

Club.create(
  bag_id: 1,
  lie: 7,
  club_type: "Driver",
  loft: 6,
  brand: "Callaway",
  model: "MAVRIK",
  image_source: "https://dks.scene7.com/is/image/GolfGalaxy/19CWYMMVRKDRHLM40DRV?qlt=70&wid=600&fmt=pjpeg",
)

Club.create(
  bag_id: 1,
  club_type: "Driver",
  lie: 7,
  loft: 7,
  brand: "TaylorMade",
  model: "SIM",
  image_source: "https://dks.scene7.com/is/image/GolfGalaxy/19TYMMSMDRVRDMNXXDRV?qlt=70&wid=600&fmt=pjpeg",
)

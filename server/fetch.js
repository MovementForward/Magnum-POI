coords = '39.768956,-86.153970'
types = ['church', 'synagogue', 'mosque', 'hindu_temple']
api_key = ''
place_id = 'ChIJq8TOOLtQa4gRLCyNswJcRUQ'

https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=#{coords}&rankby=location&type=#{types[0]}&key=#{api_key}

https://maps.googleapis.com/maps/api/place/details/json?placeid=#{place_id}&key=#{api_key}
# TODO

## Upload

- Throttle concurrency
- Get Exif data from pictures
- Add Toast messages
- Error handling
- Link back to main page to view pictures
- Cancel upload

## Auth

- Login with Auth0
- Only users can upload (guard routes)
- Save owner data with pictures

## Database

- Create schema
- Write data to db after image is uploaded (+ error handling)
- REST methods
  - Get all images in main page
  - Upload image(s)
  - Delete image (db and s3.send(DeleteObjectCommand))

## Gallery

- Sort by date, most recent

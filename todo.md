# TODO

## Upload

- Refactor API routes into server actions
- Test that multiple files upload
- Add bin icon after upload to allow delete
- Error handling
- Add Toast messages
- Get Exif data from pictures
- Link back to main page to view pictures

## Database

- Create schema
- Write data to db after image is uploaded (+ error handling)
- REST methods
  - Get all images in main page
  - Upload image(s)
  - Delete image (db and s3.send(DeleteObjectCommand))

## Gallery

- Shad CDN
- Sort by date, most recent

## Auth

- Login with Auth0
- Only users can upload (guard routes)
- Save owner data with pictures

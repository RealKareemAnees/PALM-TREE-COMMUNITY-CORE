# routes

## get the master page

- **get** [/palm-tree]()
  nothing else for now

## read a file

- **get** [/palm-tree/read/read-file/:readpath]()
  just downloads the file

- **post** [/palm-tree/read/read-file/]()
  req body:-
  ```json
  {
    "filepath": filepath
  }
  ```
  the req sent to the reader:-
  ```json
  {
    "read_type": "single_file",
      "file_path": filepath,
  }
  ```

# Create Descriptions

This metadata section is meant to extract descriptions from the rtf files from http://buddhanet.net/pdf_file/pdf_filelist12.zip and merge them with the current filelist.

To extract the text files, the following command was used:

```
# Note: unrtf required.
# Note: assuming cwd is 'metadata'
mkdir data 2>dev/null
for i in children general history-art mahayana meditation theravada
  do unrtf pdf_filelist_theravada.rtf --text > data/descriptions_theravada
done
```

## Usage

These all should be run via command prompt, using `node`

### Step 1: Extract the descriptions

    node description_to_json.js

### Step 2: Attempt to resolve book names

    node find_missing_books_in_filelist.js

This will create a series of json files inside of `missing` which contain maps of the original book name to the new book name.
Any places that contain a `null` must be manually filled in.


### Step 3: Create the final file list with descriptions

    node create_final_descriptions_filelist.js


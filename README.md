# mini-wp


| Title        | URL       | Method | Request Body | Request Header| Sucsess Response | Error Response | notes|
| :---         |:---       | :---   |   :---:      |  :---         |       ---        |       :---     |   ---|
|Register User | /register | POST   |   <ol> attributes <li> name(String) </li> <li> email(String) </li> <li> password(String)|  none   | <ol> attributes <li> name(String) </li> <li> email(String) </li> <li> password(String) </li> <li> type <br>(String) </li>  </ol>  |  500 : **internal server error**  | type has enum ``auto`` for 3rd party registration and ``manual`` |
|Login for manual user | /login| POST | <ol><li>Email(string)</li><li>Password</li></ol>|none| <ol><li>id(String)</li><li>token(String)</li><li>name(String)</li></ol> | `500 : Internal server error` | |
|login for 3rdParty(google)| /logingoogle | POST | <ol><li>Email(string)</li><li>Password</li></ol>|none| <ol><li>id(String)</li><li>token(String)</li><li>name(String)</li></ol> |`500 : Internal server error` | |
| get public article | /articles | GET | none | none | title, description, content, tags, author, feature_image | `500 : Internal server error` | get first 10 recent articles |
|seacrh article  | /search?search=<paramater> | none | none |  title, description, content, tags, author | `500 : Internal server error` |  |
|publish article | /article/user | POST |  title, description, content, tags, author, image | token(string) | title, description, content, tags, author, feature_image | `500 : Internal server error` | post with formData|
|upload Image only | /uploadImage | POST | image (in formData) | token(string) | ImageUrl | `500 : Internal server error` | | |
|Edit Article | /articles/:id | PATCH |  title, description, content, tags | token(string) | title, description, content, tags, author, feature_image | `500 : Internal server error` | |
| Delete Article | /articles/:id |DELETE | Articles._id | token(string) |  title, description, content, tags, feature_image | `500 : Internal server error` | |


##Usage
```bash
npm install
create your 
SECRET_JWT= <secret jtw>
database= <database_url>
PORT=<port>
CLOUD_BUCKET=<cloud bucket from google>
GCLOUD_PROJECT= <project name for bucket>
KEYFILE_PATH=
```
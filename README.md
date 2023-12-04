# CRMClient side API
this api is a part of create CRM Ticket system with MERN stack technology you will find the frontend part in my github 
[link to my github here](https://github.com/MedAmineTestouri/crm-backend)
## how to use 
 ```
run  :
 git clone ...
run  :
npm start

```
Note : Make sure you have nodemon s installed in your system otherwise you can install a dev dependencies in the project .

## API Recources
### User API Resources
**All the user API router follows `/v1/user` :**
|#| Routers|method|Progress|is Private|description
|----------------|----------------|------------|--------------|-------------|-----------------|
|1| `/v1/user/login`|POST|TODO|No|verify user Authentication and return JWT
|2|`/v1/user/request-reset-password`|POST|TODO|No|verify email and email pin to reset password
|3|`/v1/user/reset-password`|PUT|TODO|No|Replace with new password
|4|`/v1/user/{id}`|GET|TODO|Yes|Get users info

### Ticket API Resources
**all the Ticket API Router follows `/v1/ticket` :**

|#| Routers|method|Progress|is Private|description
|----------------|----------------|------------|--------------|-------------|-----------------|
|1| `/v1/ticket`|GET|TODO|Yes|Get all ticket for the signed in users
|2|`/v1/ticket/{id}`|GET|TODO|Yes|get a ticket details
|3|`/v1/ticket`|POST|TODO|Yes|Create new ticket
|4|`/v1/ticket/{id}`|PUT|TODO|Yes|update ticket details ie. reply message
|5|`/v1/ticket/close-ticket/{id}`|PUT|TODO|Yes|update ticket details ie. reply message



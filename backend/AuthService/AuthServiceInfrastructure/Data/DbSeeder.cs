// using System;
// using System.Collections.Generic;
// using System.Linq;
// using System.Threading.Tasks;
// using AuthServiceInfrastructure.Identity;
// using Microsoft.AspNetCore.Identity;

// namespace AuthServiceInfrastructure.Data
// {
//     public class DbSeeder
//     {
//         public static async Task SeedUsers(UserManager<ApplicationUser> userManager, RoleManager<IdentityRole> roleManager)
//         {

//             if (userManager.Users != null && userManager.Users.Any())
//                 return;

    
//             if (roleManager.Roles != null && !roleManager.Roles.Any())
//             {
//                 await roleManager.CreateAsync(new IdentityRole("Admin"));
//                 await roleManager.CreateAsync(new IdentityRole("User"));
//             }

          
//             var admin = new ApplicationUser
//             {
              
//                 UserName = "admin",
//                 Email = "admin@test.com",

//             };

//             var adminResult = await userManager.CreateAsync(admin, "Pa$$w0rd");

//             if (adminResult.Succeeded)
//             {
//                 await userManager.AddToRoleAsync(admin, "Admin");
//             }

      
//             var user = new ApplicationUser
//             {
               
//                 UserName = "korisnik",
//                 Email = "korisnik@test.com",
//             };

//             var userResult = await userManager.CreateAsync(user, "Pa$$w0rd");

//             if (userResult.Succeeded)
//             {
//                 await userManager.AddToRoleAsync(user, "User");
//             }
//         }
//     }
// }
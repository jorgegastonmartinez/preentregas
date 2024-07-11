import passport from "passport";
import UserDTO from "../dto/user.dto.js";

import { createCart } from "./cart.controller.js";
import cartsModel from "../models/cart.model.js";





export const registerUser = (req, res, next) => {
  passport.authenticate("register", { failureRedirect: "/failregister" }, (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.redirect("/failregister");
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      return res.redirect("/login");
    });
  })(req, res, next);
};

export const failRegister = (req, res) => {
  console.log("Estrategia fallida");
  res.send({ error: "Falló" });
};


export const loginUser = (req, res, next) => {
  passport.authenticate("login", { failureRedirect: "/faillogin" }, (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(400).send({ status: "Error", error: "Error al iniciar sesión" });
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }

      req.session.user = {
        _id: user._id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        age: user.age,
        cart: user.cart,
    
        role: user.role,
      };

      console.log(req.session.user);
       if (user.role === 'admin') {
        return res.redirect('/admin/products');
      } else if (user.role === 'user' || "User") {
        return res.redirect('/products');
      } else {
        return res.redirect('/not-authorized');
      }
    });
  })(req, res, next);
};



// export const loginUser = (req, res, next) => {
//   passport.authenticate("login", { failureRedirect: "/faillogin" }, (err, user, info) => {
//     if (err) {
//       return next(err);
//     }
//     if (!user) {
//       return res.status(400).send({ status: "Error", error: "Error al iniciar sesión" });
//     }
//     req.logIn(user, (err) => {
//       if (err) {
//         return next(err);
//       }

      
//       req.session.user = {
//         _id: user._id,
//         first_name: user.first_name,
//         last_name: user.last_name,
//         email: user.email,
//         age: user.age,
//         cart: user.cart._id,
    
//         role: user.role,
//       };

//       //
//        // Verificar y crear el carrito si es necesario
//        const { message, cart } = cartsModel.createCartForUser(user._id);
//        req.session.user.cart = cart._id;
   
//        res.json({ message: 'Inicio de sesión exitoso', cart });


//       // //

//       console.log(req.session.user);


//        if (user.role === 'admin') {
//         return res.redirect('/admin/products');
//       } else if (user.role === 'user' || "User") {
//         return res.redirect('/products');
//       } else {
//         return res.redirect('/not-authorized');
//       }
//     });
//   })(req, res, next);
// };





// export const loginUser = (req, res, next) => {
//   passport.authenticate('login', { failureRedirect: '/faillogin' }, async (err, user, info) => {
//     if (err) {
//       return next(err);
//     }
//     if (!user) {
//       return res.status(400).send({ status: 'Error', error: 'Error al iniciar sesión' });
//     }

//     try {
//       await req.logIn(user);

//       // Verificar y crear el carrito si es necesario
//       const { message, cart } = await createCart(user._id);

//       if (cart && cart._id) {
//         req.session.user = {
//           _id: user._id,
//           first_name: user.first_name,
//           last_name: user.last_name,
//           email: user.email,
//           age: user.age,
//           cart: user.cart._id,  // Asignar el ID del carrito a la sesión
//           role: user.role,
//         };

//         console.log('Usuario en sesión:', req.session.user);

//         // Redirigir al usuario basado en su rol
//         if (user.role === 'admin') {
//           return res.redirect('/admin/products');
//         } else if (user.role === 'user' || user.role === 'User') {
//           return res.redirect('/products');
//         } else {
//           return res.redirect('/not-authorized');
//         }
//       } else {
//         console.error('No se pudo obtener el ID del carrito.');
//         return res.status(500).json({ error: 'Error al asignar el carrito' });
//       }
//     } catch (error) {
//       console.error('Error al iniciar sesión:', error);
//       return res.status(500).json({ error: 'Error al iniciar sesión' });
//     }
//   })(req, res, next);
// };



export const failLogin = (req, res) => {
  res.send({ error: "Login fallido" });
};

export const logoutUser = (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(500).send("Error al cerrar la sesión");
    res.redirect("/login");
  });
};

export const getCurrentUser = (req, res) => {
  try {
    if (!req.session || !req.session.user) {
      return res.redirect("/login");
    }

    const userDTO = new UserDTO(req.session.user);
    console.log(userDTO); 
    
    res.render('current', { user: userDTO, isAdmin: req.session.user.role === 'admin' });
  } catch (error) {
    console.error("Error al obtener el usuario actual:", error);
    return res.status(500).send({ error: "Error al obtener el usuario actual" });
  }
};

export const githubCallback = (req, res) => {
  req.session.user = req.user;
  res.redirect("/products");
};
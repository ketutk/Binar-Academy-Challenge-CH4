const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const bcryptjs = require("bcryptjs");
const jsonwebtoken = require("jsonwebtoken");

exports.registerUser = async (req) => {
  try {
    // Ambil data dari body
    const { name, email, password, identity_type, identity_number, address } = req.body;

    // Cek Duplikat
    const duplicate = await prisma.users.findUnique({
      where: {
        email: email,
      },
    });

    if (duplicate) {
      return {
        status: 403,
        message: "This email is already used",
        data: null,
      };
    }

    // Buat user beserta profile
    const createUser = await prisma.users.create({
      data: {
        name: name,
        email: email,
        password: await bcryptjs.hash(password, 10),
        profiles: {
          create: {
            identity_type,
            identity_number,
            address,
          },
        },
      },
    });

    // Buat token untuk akses
    const token = jsonwebtoken.sign(
      {
        id: createUser.id,
        name: createUser.name,
        email: createUser.email,
      },
      process.env.JWT_KEY,
      {
        expiresIn: process.env.TIMEEXPIRES,
      }
    );

    // Return
    return {
      status: 201,
      message: "Successfully register",
      data: {
        user: createUser,
        token,
      },
    };
  } catch (err) {
    console.log(err);
    return {
      status: 500,
      message: err.message,
      data: null,
    };
  }
};

exports.loginUser = async (req) => {
  try {
    // Ambil data dari body
    const { email, password } = req.body;

    // Cek ketersediaan user
    const user = await prisma.users.findUnique({
      where: {
        email: email,
      },
    });

    // Return jika tidak ada
    if (!user) {
      return {
        status: 404,
        message: "User not found",
        data: null,
      };
    }

    // Compare password
    const validPassword = await bcryptjs.compare(password, user.password);
    // Return jika tidak valid
    if (!validPassword) {
      return {
        status: 403,
        message: "Incorrect email or password",
        data: null,
      };
    }

    const token = jsonwebtoken.sign(
      {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      process.env.JWT_KEY,
      {
        expiresIn: process.env.TIMEEXPIRES,
      }
    );

    // Return token
    return {
      status: 200,
      message: "Successfully login",
      data: {
        token,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      status: 500,
      message: error.message,
      data: null,
    };
  }
};

exports.getUsers = async (req) => {
  try {
    // Pagination setting
    const page = req.query.page || 1;
    const limit = 5;
    const totalData = await prisma.users.count({});
    const totalPage = Math.ceil(totalData / limit);

    if (page > totalPage) {
      return {
        status: 400,
        message: "Page exceeded total page",
        data: null,
      };
    }

    const usersData = await prisma.users.findMany({
      skip: (page - 1) * limit,
      take: limit,
    });

    return {
      status: 200,
      message: "Sucessfuly get users data",
      data: {
        users: usersData,
        current_page: page,
        total_page: totalPage,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      status: 500,
      message: error.message,
      data: null,
    };
  }
};

exports.getUserById = async (req) => {
  try {
    const { userId } = req.params;

    const userData = await prisma.users.findUnique({
      where: {
        id: userId,
      },
      include: {
        profiles: true,
      },
    });

    if (!userData) {
      return {
        status: 400,
        message: "User not found",
        data: null,
      };
    }

    return {
      status: 200,
      message: "Successfully get user data",
      data: {
        users: userData,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      status: 500,
      message: error.message,
      data: null,
    };
  }
};

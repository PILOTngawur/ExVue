const express = require('express');

const bcrypt = require("bcryptjs");

const prisma = require('../prisma/client');

const { validationResult } = require('express-validator');


//find all users
const findUser = async ( req, res) => {
    try {
        const user = await prisma.user.findMany({
            select: {
                id: true,
                name: true,
                email: true
            },
            orderBy: {
                id: 'desc'
            }
        });

        res.status(200).send({
            success: true,
            message: "succes",
            data: user
        });
    } catch (error){
        res.status(500).send({
            success: false,
            message: "Internal Server Error",
        })
    }
};

//function Create User
const createUser = async ( req, res) => {

    const error = validationResult(req);

    if (!error.isEmpty()){
        return res.status(422).send({
        success: false,
        message: "Validation Error",
        data: error.array()
    });
    };


const hashPassword = await bcrypt.hash(req.body.password, 10);
    try {

        const user = await prisma.user.create({
            data: {
                name: req.body.name,
                email: req.body.email,
                password: hashPassword
            }
        });

        res.status(201).send({
            success: true,
            message: "User Created Successfully",
            data: user
        })

    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Internal Server Error",
        })
    }
};

//function FinduserById
const findUserById = async ( req, res) => {
    const { id } = req.params;

    try {
        const user = await prisma.user.findUnique({
            where: {
                id: Number(id),
            },
            select: {
                id: true,
                name: true,
                email: true
            }
        });

        res.status(200).send({
            success: true,
            message: "Success",
            data: user,
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Internal Server Error",
        })
    }
}

//function UpdateUser
const updateUser = async ( req, res) => {
    const {id} = req.params;

    const error = validationResult(req);

    if (!error.isEmpty()){
        return res.status(400).send({
            success: false,
            message: "Validation Error",
            data: error.array()
        })
    }

    const hashPassword = await bcrypt.hash(req.body.password, 10);

    try {
        const user = await prisma.user.update({
            where: {
                id: Number(id),
            },
            data : {
                name: req.body.name,
                email: req.body.email,
                password: hashPassword
            }
        })

        res.status(200).send({
            success: true,
            message: "User Updated Successfully",
            data:user
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Internal Server Error",
        })
    }
}

//delete USer
const deleteUser = async (req, res) => {
    const {id} = req.params;

    try {
        await prisma.user.delete({
            where: {
                id: Number(id),
            }
        })

        res.status(200).send({
            success: true,
            message: "User Deleted Successfully",
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Internal Server Error",
        })
    }
}

module.exports = { findUser, createUser, findUserById, updateUser, deleteUser };
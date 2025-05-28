import { Request, Response } from "express";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import {findUserByUsername, createUser} from '../models/user.model';


export const signup = async(req: Request, res: Response): Promise<void> =>{
    const {username, password} = req.body;

    const existingUser  = await findUserByUsername(username);

    if(existingUser){
        res.status(400).json({
            error:'Username already exists'
        })
    }

    const saltRound = 10;
    const hashed = await bcrypt.hash(password, saltRound);
    const user = await createUser(username, hashed);

    res.status(201).json({
        message: 'user created', user
    });

    console.log('Swagger body:', req.body);

};


export const login = async(req: Request, res: Response): Promise<void> =>{
    const {username, password} = req.body;

    const user = await findUserByUsername(username);

    if(!user || !(await bcrypt.compare(password, user.password))){
        res.status(401).json({
            error: 'Invalid credentials'
        });
    }

    const token = jwt.sign({id: user.id}, process.env.JWT_SECRET!, {expiresIn: '1h'});
    res.json({token}); 
}

export default {signup, login};
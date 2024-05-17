// backend/src/controllers/resourceController.ts
import Resource from '../models/ResourceModel';

// Add a resource
export const addResource = async (req, res) => {
    try {
        const resource = new Resource(req.body);
        await resource.save();
        res.status(201).send(resource);
    } catch (error) {
        res.status(400).send(error);
    }
};

// Update, Delete, and Get Resource similar functions

// Update a resource

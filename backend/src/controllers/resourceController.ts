// backend/src/controllers/resourceController.ts
import { Request, Response } from 'express';
import Resource from '../models/ResourceModel';

// Update a resource
export const updateResource = async (req: Request, res: Response) => {
    const { resourceId } = req.params;
    try {
        const resource = await Resource.findByIdAndUpdate(resourceId, req.body, { new: true });
        if (!resource) {
            return res.status(404).send();
        }
        res.send(resource);
    } catch (error) {
        res.status(400).send(error);
    }
};

// Delete a resource
export const deleteResource = async (req: Request, res: Response) => {
    const { resourceId } = req.params;
    try {
        const resource = await Resource.findByIdAndDelete(resourceId);
        if (!resource) {
            return res.status(404).send();
        }
        res.send(resource);
    } catch (error) {
        res.status(400).send(error);
    }
};

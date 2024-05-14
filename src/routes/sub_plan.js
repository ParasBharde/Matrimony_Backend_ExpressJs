import express from 'express'

const subscriptionPlanRouter = express();

const data = [
    {
        id: 1,
        plan_name: "Gold Plan",
        Description_one: "Description one",
        Description_two: "Description two",
        Description_three: "Description three"
    },
    {
        id: 2,
        plan_name: "Silver Plan",
        Description_one: "Description one",
        Description_two: "Description two",
        Description_three: "Description three"
    },
    {
        id: 3,
        plan_name: "Platinium Plan",
        Description_one: "Description one",
        Description_two: "Description two",
        Description_three: "Description three"
    }
]

subscriptionPlanRouter.get('/', (req, res) => {
    try {
        res.status(200).json({
            data: data
        })
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err
        })
    }
})

export default subscriptionPlanRouter

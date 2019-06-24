const requireOption = require('../requireOption');

module.exports = function (objectrepository) {

    const Doctormodell = requireOption(objectrepository, 'Doctormodell');


    return function (req, res, next) {
        Doctormodell.findOne({_id:req.params.id}, function (err, doctor) {
           if(err)
           {
               console.log(err)
               return res.redirect('/');
           } 
            let sum=0;
            for(let i =0;i<doctor.rate.length;i++)
            {
                sum+=parseInt(doctor.rate[i]);
            }
            let a =Math.round(sum/doctor.rate.length).toString();
            doctor.sumrate = a;
            res.locals.doctor = doctor;
            res.locals.doctor.save();
            return next();
          });
    };
};
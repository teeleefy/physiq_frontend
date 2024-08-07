import axios from "axios";

let BASE_URL = "https://physiq-backend.onrender.com";
// let BASE_URL = process.env.VITE_APP_BASE_URL ? process.env.VITE_APP_BASE_URL : "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class PhysiqApi {
    // the token for interactive with the API will be stored here.
    static token;
  
    static async request(endpoint, data = {}, method = "get") {
      const url = `${BASE_URL}/${endpoint}`;
      const headers = { Authorization: `Bearer ${PhysiqApi.token}` };
      const params = (method === "get")
          ? data
          : {};
  
      try {
        return (await axios({ url, method, data, params, headers })).data;
      } catch (err) {
        console.error("API Error:", err.response);
        let message = err.response.data.error.message;
        throw Array.isArray(message) ? message : [message];
      }
    }
  




    // CRUD API routes

    /** AUTH ROUTES */
  
    static async loginUser(data) {
        let res = await this.request(`auth/token`, data, "post");
        return res.token;
        }
    
    static async signupUser(data) {
        let res = await this.request(`auth/register`, data, "post");
        return res.token;
        }





    

    //** POST ROUTES */
      //POST MEMBER
    static async addFamilyMember(familyId, data) {
        let res = await this.request(`families/${familyId}/members`, data, "post");
        return res.member;
        }
      //POST ALLERGY
    static async addMemberAllergy(id, data) {
        let res = await this.request(`members/${id}/allergies`, data, "post");
        return res.allergy;
        }
      //POST DIAGNOSIS
    static async addMemberDiagnosis(id, data) {
        let res = await this.request(`members/${id}/diagnoses`, data, "post");
        return res.diagnosis;
        }
      //POST DOCTOR
    static async addMemberDoctor(id, data) {
        let res = await this.request(`members/${id}/doctors`, data, "post");
        return res.doctor;
        }
      //POST IMAGE
    static async addMemberImage(id, data) {
        let res = await this.request(`members/${id}/images`, data, "post");
        return res.image;
        }
      //POST INSURANCE
    static async addMemberInsurance(id, data) {
        let res = await this.request(`members/${id}/insurance`, data, "post");
        return res.insurance;
        }
      //POST MED
    static async addMemberMed(id, data) {
        let res = await this.request(`members/${id}/meds`, data, "post");
        return res.med;
        }
      //POST SYMPTOM
    static async addMemberSymptom(id, data) {
        let res = await this.request(`members/${id}/symptoms`, data, "post");
        return res.symptom;
        }

       //POST VISIT
    static async addMemberVisit(id, data) {
        let res = await this.request(`members/${id}/visits`, data, "post");
        return res.visit;
        }
        //POST GOAL
    static async addMemberGoal(id, data) {
        let res = await this.request(`members/${id}/goals`, data, "post");
        return res.goal;
        }





    /** GET ROUTES */
        //------------GET SINGLE THING-----------------
        //GET FAMILY
    static async getCurrentFamily(familyId) {
      let res = await this.request(`families/${familyId}`);
      return res.family;
    }
        //GET MEMBER
    static async getMember(id) {
      let res = await this.request(`members/${id}`);
      return res.member;
    }
        //GET MEMBER ALLERGY
    static async getMemberAllergy(id, allergyId) {
        let res = await this.request(`members/${id}/allergies/${allergyId}`);
        return res.allergy;
      }
        //GET MEMBER DIAGNOSIS
    static async getMemberDiagnosis(id, diagnosisId) {
        let res = await this.request(`members/${id}/diagnoses/${diagnosisId}`);
        return res.diagnosis;
      }
        //GET MEMBER DOCTOR
    static async getMemberDoctor(id, doctorId) {
        let res = await this.request(`members/${id}/doctors/${doctorId}`);
        return res.doctor;
      }
        //GET MEMBER IMAGE
    static async getMemberImage(id, imageId) {
        let res = await this.request(`members/${id}/images/${imageId}`);
        return res.image;
      }
        //GET MEMBER INSURANCE
    static async getMemberSingleInsurance(id, insuranceId) {
        let res = await this.request(`members/${id}/insurance/${insuranceId}`);
        return res.insurance;
      }
        //GET MEMBER GOAL
    static async getMemberGoal(id, goalId) {
        let res = await this.request(`members/${id}/goals/${goalId}`);
        return res.goal;
      }
        //GET MEMBER MED
    static async getMemberMed(id, medId) {
        let res = await this.request(`members/${id}/meds/${medId}`);
        return res.med;
      }
        //GET MEMBER SYMPTOM
    static async getMemberSymptom(id, symptomId) {
        let res = await this.request(`members/${id}/symptoms/${symptomId}`);
        return res.symptom;
      }
        //GET MEMBER VISIT
    static async getMemberVisit(id, visitId) {
        let res = await this.request(`members/${id}/visits/${visitId}`);
        return res.visit;
      }

    //------------GET ALL-----------------
        //GET MEMBER ALLERGIES
    static async getMemberAllergies(id) {
      let res = await this.request(`members/${id}/allergies`);
      return res.allergies;
    }
        //GET MEMBER DIAGNOSES
    static async getMemberDiagnoses(id) {
      let res = await this.request(`members/${id}/diagnoses`);
      return res.diagnoses;
    }
        //GET MEMBER DOCTORS
    static async getMemberDoctors(id) {
      let res = await this.request(`members/${id}/doctors`);
      return res.doctors;
    }
        //GET MEMBER IMAGES
    static async getMemberImages(id) {
      let res = await this.request(`members/${id}/images`);
      return res.images;
    }
        //GET MEMBER INSURANCE
    static async getMemberInsurance(id) {
      let res = await this.request(`members/${id}/insurance`);
      return res.insurance;
    }
        //GET MEMBER MEDS
    static async getMemberMeds(id) {
        let res = await this.request(`members/${id}/meds`);
        return res.meds;
        }
        //GET MEMBER SYMPTOMS
    static async getMemberSymptoms(id) {
      let res = await this.request(`members/${id}/symptoms`);
      return res.symptoms;
    }
        //GET MEMBER VISITS
    static async getMemberVisits(id) {
      let res = await this.request(`members/${id}/visits`);
      return res.visits;
    }
        //GET MEMBER GOALS
    static async getMemberGoals(id) {
      let res = await this.request(`members/${id}/goals`);
      return res.goals;
    }
        








    /** UPDATE ROUTES */
        //UPDATE FAMILY
    static async updateCurrentFamily(familyId, data) {
        let res = await this.request(`families/${familyId}`, data, "patch");
        return res.family;
        }
    static async updatePassword(familyId, data) {
        let res = await this.request(`families/${familyId}/password`, data, "patch");
        return res.family;
        }
        //UDPATE MEMBER
    static async updateMember(id, data) {
        let res = await this.request(`members/${id}`, data, "patch");
        return res.member;
        }
        //UDPATE ALLERGY
    static async updateAllergy(id, allergyId, data) {
        let res = await this.request(`members/${id}/allergies/${allergyId}`, data, "patch");
        return res.allergy;
        }
        //UDPATE DIAGNOSIS
    static async updateDiagnosis(id, diagnosisId, data) {
        let res = await this.request(`members/${id}/diagnoses/${diagnosisId}`, data, "patch");
        return res.diagnosis;
        }
        //UDPATE DOCTOR
    static async updateDoctor(id, doctorId, data) {
        let res = await this.request(`members/${id}/doctors/${doctorId}`, data, "patch");
        return res.doctor;
        }
        //UDPATE IMAGE
    static async updateImage(id, imageId,data) {
        let res = await this.request(`members/${id}/images/${imageId}`, data, "patch");
        return res.image;
        }
        //UDPATE INSURANCE
    static async updateInsurance(id, insuranceId, data) {
        let res = await this.request(`members/${id}/insurance/${insuranceId}`, data, "patch");
        return res.insurance;
        }
        //UDPATE MED
    static async updateMed(id, medId, data) {
        let res = await this.request(`members/${id}/meds/${medId}`, data, "patch");
        return res.med;
        }
        //UDPATE SYMPTOM
    static async updateSymptom(id, symptomId, data) {
        let res = await this.request(`members/${id}/symptoms/${symptomId}`, data, "patch");
        return res.symptom;
        }
        //UDPATE VISIT
    static async updateVisit(id, visitId, data) {
        let res = await this.request(`members/${id}/visits/${visitId}`, data, "patch");
        return res.visit;
        }
        //UDPATE GOAL
    static async updateGoal(id, goalId, data) {
        let res = await this.request(`members/${id}/goals/${goalId}`, data, "patch");
        return res.goal;
        }







    /** DELETE ROUTES */
        //DELETE FAMILY
    static async deleteCurrentFamily(familyId) {
        let res = await this.request(`families/${familyId}`, {}, "delete");
        return res.deleted;
        }
        //DELETE MEMBER     
    static async deleteMember(id) {
        let res = await this.request(`members/${id}`, {}, "delete");
        return res.deleted;
    }
        //DELETE ALLERGY     
    static async deleteAllergy(id, allergyId) {
        let res = await this.request(`members/${id}/allergies/${allergyId}`, {}, "delete");
        return res.deleted;
    }
        //DELETE DIAGNOSIS    
    static async deleteDiagnosis(id, diagnosisId) {
        let res = await this.request(`members/${id}/diagnoses/${diagnosisId}`, {}, "delete");
        return res.deleted;
    }
       //DELETE DOCTOR    
    static async deleteDoctor(id, doctorId) {
        let res = await this.request(`members/${id}/doctors/${doctorId}`, {}, "delete");
        return res.deleted;
    }
       //DELETE IMAGE    
    static async deleteImage(id, imageId) {
        let res = await this.request(`members/${id}/images/${imageId}`, {}, "delete");
        return res.deleted;
    }
       //DELETE INSURANCE    
    static async deleteInsurance(id, insuranceId) {
        let res = await this.request(`members/${id}/insurance/${insuranceId}`, {}, "delete");
        return res.deleted;
    }
       //DELETE MED    
    static async deleteMed(id, medId) {
        let res = await this.request(`members/${id}/meds/${medId}`, {}, "delete");
        return res.deleted;
    }
       //DELETE SYMPTOM     
    static async deleteSymptom(id, symptomId) {
        let res = await this.request(`members/${id}/symptoms/${symptomId}`, {}, "delete");
        return res.deleted;
    }
       //DELETE VISIT    
    static async deleteVisit(id, visitId) {
        let res = await this.request(`members/${id}/visits/${visitId}`, {}, "delete");
        return res.deleted;
    }
       //DELETE GOAL    
    static async deleteGoal(id, goalId) {
        let res = await this.request(`members/${id}/goals/${goalId}`, {}, "delete");
        return res.deleted;
    }
          
  }

  export default PhysiqApi;

  
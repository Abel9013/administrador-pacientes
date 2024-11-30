import { create } from "zustand"
import { v4 as uuidv4 } from "uuid"
import { DraftPatient, Patient } from "./types"
import { devtools } from "zustand/middleware"

type PatientState = {
    patients: Patient[]
    activeID: Patient["id"]
    addPatient: (data : DraftPatient) => void
    deletePatient: (id : Patient["id"]) => void
    getPatientById: (id : Patient["id"])=> void
    updatedPatient: (data: DraftPatient) => void

}
const createPatient = (patient : DraftPatient) : Patient => {
    return {...patient, id: uuidv4() }
}
export const usePatientStore = create<PatientState>()(
    devtools((set)=>({
        patients: [],
        activeID:"",
        addPatient: (data)=>{

            const newPatient = createPatient(data) 
            set((state)=>({
                patients:[...state.patients, newPatient]
            }))
        },
        deletePatient: (id) => {
            set((state)=>({
                patients: state.patients.filter(patient => patient.id !== id )
            }));
        },
        getPatientById: (id) => {
            set(()=>({
                activeID: id
            }))
            
        },
        updatedPatient: (data) => {
            set((state)=>({
                patients: state.patients.map(patient => patient.id === state.activeID ? {id: state.activeID, ...data} : patient),
                activeID:""
            }))
        }

})))


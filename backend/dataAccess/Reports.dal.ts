import { getDB } from "../utils/dbConn.js";
import { Report, NewReport } from "../models/types.js";
import { ObjectId } from "mongodb";



export async function createReport(report: NewReport){
    const db = getDB()
    const reports = db.collection<Report>("Reports")
    const result = await reports.insertOne(report)
    return result.insertedId
}

export async function createReports(reports: NewReport[]){
    const db = getDB()
    const reportsCollection = db.collection<Report>("Reports")
    const result = await reportsCollection.insertMany(reports)
    return result.insertedIds
}

export async function getAllReports(filter?: any){
    const db = getDB()
    const reports = db.collection<Report>("Reports")
    const result = await reports.find().toArray()
    return result
}



export async function getReportsByFilter(filter: Partial<Report> = {}) {

  const mongoFilter: any = { ...filter };

  if (filter._id) {
    mongoFilter._id = new ObjectId(filter._id);
  }
    const db = getDB()
    const reports = db.collection<Report>("Reports")

  const result = await reports
    .find(mongoFilter)
    .toArray();

  return result;
}

export async function getReportById(id: string) {
    const db = getDB()
    const reports = db.collection<Report>("Reports")
  const result = await reports.findOne({
    _id: new ObjectId(id)
  });

  return result;
}
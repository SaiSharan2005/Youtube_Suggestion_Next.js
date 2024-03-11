export default interface SideBarData{
    subCourseName: string;
    subCourseId:number;
    subTopics:{
      id:number;
      main_id:number;
      topic_name : string;
      extra_details:string;
      tutorial_Video:string;
      duration:string;
    }[]
  }
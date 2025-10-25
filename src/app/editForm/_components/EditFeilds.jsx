import React, { useEffect, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Pencil,Trash } from "lucide-react";
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button";
import { toast } from "sonner"

export default function EditFeilds({field,onUpdate,onDelete}) {

  const [label,setlabel]=useState(field?.label);
  const [Placeholder,setPlaceholder]=useState(field?.placeholder);

  useEffect(()=>{
    
  },[Placeholder,label])

  return (

    <div>
        
        <div className="flex">
          <Popover>
          <PopoverTrigger>
              <Pencil color="#7c3aed" strokeWidth={1}/>
          </PopoverTrigger>
          <PopoverContent>
            {
              <div>
                <h2>Fields Edit</h2>
                <div>
                  <Label className="p-2 m-2" htmlFor="email">Label</Label>
                  <Input type="text" onChange={(e)=>{setlabel(e.target.value)}} defaultValue={field?.label}/>
                </div>

                {["text", "email", "number", "password", "date"].includes(
                field.type
                ) && <div>
                  <Label className="p-2 m-2" htmlFor="email">Placeholder</Label>
                  <Input type="text" onChange={(e)=>{setPlaceholder(e.target.value)}} defaultValue={field?.placeholder}/>
                </div>}
                
                <Button
                  className="m-2"
                  onClick={()=>{
                    onUpdate(
                      {label:label,
                        Placeholder:Placeholder}
                      )
                    toast("Updated Successfully.")
                  }
                
                }
                  >Update
                </Button>
              </div>
            }
          </PopoverContent>
        </Popover>

        <div>
          <Trash color="#ff0000" strokeWidth={1} onClick={()=>{
          onDelete()
         toast("Delted Successfully.")
          }} />
        </div>
        </div>
    </div>
    
  );
}

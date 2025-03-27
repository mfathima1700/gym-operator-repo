import React from 'react'
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'

export  function DeleteDialog() {
  return (
   <>
    <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Deactivate account</DialogTitle>
          <DialogDescription>
          Are you sure you want to deactivate your account? 
          All of your data will be permanently removed from our servers forever. 
          This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        
        <DialogFooter>
          <Button variant="destructive" >Delete</Button>
        </DialogFooter>
      </DialogContent>
   </>
  )
}

export default DeleteDialog
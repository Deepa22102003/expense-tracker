package com.expense.tracker.controller;

import com.expense.tracker.model.ExpenseGroup;
import com.expense.tracker.service.GroupService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/groups")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5500", "http://127.0.0.1:5500", "file://"})
public class GroupController {
    
    @Autowired
    private GroupService groupService;
    
    // GET all groups
    @GetMapping
    public ResponseEntity<List<ExpenseGroup>> getAllGroups() {
        List<ExpenseGroup> groups = groupService.getAllGroups();
        return ResponseEntity.ok(groups);
    }
    
    // GET group by ID
    @GetMapping("/{id}")
    public ResponseEntity<ExpenseGroup> getGroupById(@PathVariable Long id) {
        Optional<ExpenseGroup> group = groupService.getGroupById(id);
        if (group.isPresent()) {
            return ResponseEntity.ok(group.get());
        }
        return ResponseEntity.notFound().build();
    }
    
    // POST - Create new group
    @PostMapping
    public ResponseEntity<ExpenseGroup> createGroup(@RequestBody ExpenseGroup group) {
        try {
            ExpenseGroup createdGroup = groupService.createGroup(group);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdGroup);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    // PUT - Update group
    @PutMapping("/{id}")
    public ResponseEntity<ExpenseGroup> updateGroup(@PathVariable Long id, @RequestBody ExpenseGroup groupDetails) {
        ExpenseGroup updatedGroup = groupService.updateGroup(id, groupDetails);
        if (updatedGroup != null) {
            return ResponseEntity.ok(updatedGroup);
        }
        return ResponseEntity.notFound().build();
    }
    
    // DELETE - Delete group
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteGroup(@PathVariable Long id) {
        Optional<ExpenseGroup> group = groupService.getGroupById(id);
        if (group.isPresent()) {
            groupService.deleteGroup(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
}

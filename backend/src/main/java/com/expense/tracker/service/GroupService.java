package com.expense.tracker.service;

import com.expense.tracker.model.ExpenseGroup;
import com.expense.tracker.repository.GroupRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class GroupService {
    
    @Autowired
    private GroupRepository groupRepository;
    
    public List<ExpenseGroup> getAllGroups() {
        return groupRepository.findAll();
    }
    
    public Optional<ExpenseGroup> getGroupById(Long id) {
        return groupRepository.findById(id);
    }
    
    public ExpenseGroup createGroup(ExpenseGroup group) {
        return groupRepository.save(group);
    }
    
    public ExpenseGroup updateGroup(Long id, ExpenseGroup groupDetails) {
        Optional<ExpenseGroup> group = groupRepository.findById(id);
        if (group.isPresent()) {
            ExpenseGroup existingGroup = group.get();
            if (groupDetails.getName() != null) {
                existingGroup.setName(groupDetails.getName());
            }
            if (groupDetails.getDescription() != null) {
                existingGroup.setDescription(groupDetails.getDescription());
            }
            return groupRepository.save(existingGroup);
        }
        return null;
    }
    
    public void deleteGroup(Long id) {
        groupRepository.deleteById(id);
    }
}

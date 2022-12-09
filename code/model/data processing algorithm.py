#!/usr/bin/env python
# coding: utf-8

# In[1]:


global mental_conditions, mental_state, payoff_motion_still, mental_condition_payoffs
mental_conditions= ["depression", "anxiety", " stress", "frustration", "paranoia"]  # defining the labels
payoff_motion_still = {"motion":[0.1,0.5,0.4,0,0], "still":[0.4,0,0,0,0]}


# In[2]:


global valuemap
valuemap = {                                                  # ranking all the observable elements in an inkblot and providing 
    "animals": [0.0,0.0,0.0,0.0,0.0],
    "innuendo": [0.5,0.4,0.3,0.2,0.0],
    "mythical": [0.0,0.4,0.3,0.1,0],
    "person": [0,0,0.4,0.0,0.4],
    "fights": [0.5,0.4,0.3,0.2,0.1]
}


# In[3]:


def adding_payoffs(lst1,mental_condition_payoffs):    # function to add payoffs to the mental conditions of the patient 
    for i in range(len(lst1)):
        mental_condition_payoffs[i] += lst1[i]
    return 


# In[4]:


def mappingfunction(elementlst):      # mapping values of elements to the conditions like depression, anxiety etc,
    mental_condition_payoffs = [0,0,0,0,0]
    global valuemap, mental_conditions, payoff_motion_still
    
    for keywords in elementlst:       # checks if the elements of the list are found in the possible elements
        for conditions in valuemap:
            if keywords in conditions:
                adding_payoffs(valuemap[keywords],mental_condition_payoffs)
            if keywords in payoff_motion_still:
                adding_payoffs(payoff_motion_still[keywords], mental_condition_payoffs)
    
    return mental_condition_payoffs    # in the unlikely event where the element is not found in the possible elements the values are zero


# In[5]:


elementlst = ["animals","motion"]
finalval = mappingfunction(elementlst)


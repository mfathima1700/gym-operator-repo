/// <reference types="@testing-library/jest-dom" />


import { render, screen, fireEvent } from '@testing-library/react'
import MemberCards from '@/components/members/MemberCards'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'

import React from 'react'

// Mock actions
jest.mock('@/redux/actions/GymActions', () => ({
  convertToMember: (id: string, gymId: string) => ({ type: 'CONVERT_TO_MEMBER', payload: { id, gymId } }),
  convertToInstructor: (id: string, gymId: string) => ({ type: 'CONVERT_TO_INSTRUCTOR', payload: { id, gymId } })
}))

const mockStore = configureStore([]); // no thunk


describe('MemberCards component', () => {
  const gymId = 'gym123'
  const mockMembers = [
    {
      id: '1',
      name: 'John Doe',
      isInstructor: false,
      createdAt: new Date('2023-01-01'),
      image: '',
    },
    {
      id: '2',
      name: 'Jane Smith',
      isInstructor: true,
      createdAt: new Date('2023-02-01'),
      image: '',
    }
  ]

  it('renders member cards with correct names and roles', () => {
    const store = mockStore({})
    render(
      <Provider store={store}>
        <MemberCards gymMembers={mockMembers} gymId={gymId} />
      </Provider>
    )

    expect(screen.getByText('John Doe')).toBeInTheDocument()
    expect(screen.getByText('Member')).toBeInTheDocument()
    expect(screen.getByText('Convert to Instructor')).toBeInTheDocument()

    expect(screen.getByText('Jane Smith')).toBeInTheDocument()
    expect(screen.getByText('Instructor')).toBeInTheDocument()
    expect(screen.getByText('Convert to Member')).toBeInTheDocument()
  })

  it('dispatches convertToInstructor when clicking the convert button for a member', () => {
    const store = mockStore({})

    const { getByText } = render(
      <Provider store={store}>
        <MemberCards gymMembers={[mockMembers[0]]} gymId={gymId} />
      </Provider>
    )

    const button = getByText('Convert to Instructor')
    fireEvent.click(button)

    const actions = store.getActions()
    expect(actions[0]).toEqual({
      type: 'CONVERT_TO_INSTRUCTOR',
      payload: { id: '1', gymId: 'gym123' }
    })
  })

  it('dispatches convertToMember when clicking the convert button for an instructor', () => {
    const store = mockStore({})

    const { getByText } = render(
      <Provider store={store}>
        <MemberCards gymMembers={[mockMembers[1]]} gymId={gymId} />
      </Provider>
    )

    const button = getByText('Convert to Member')
    fireEvent.click(button)

    const actions = store.getActions()
    expect(actions[0]).toEqual({
      type: 'CONVERT_TO_MEMBER',
      payload: { id: '2', gymId: 'gym123' }
    })
  })
})

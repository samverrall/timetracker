export function hasRole(user, role) {
  if (!user || !role) {
    return false
  }

  if (!user.roles || !user.roles.length) {
    return false
  }

  return user.roles.some(r => r.name === role)
}
